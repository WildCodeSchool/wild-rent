// permet l'utilisation de process.env (example: process.env.RESEND_API_KEY)
import "dotenv/config";
import {
  Query,
  Mutation,
  Resolver,
  Arg,
  Ctx,
  Field,
  ObjectType,
  Int,
} from "type-graphql";
import { User } from "../entities/User";
import { TempUser } from "../entities/TempUser";
import { UserInput } from "../inputs/UserInput";
import { LoginInput } from "../inputs/LoginInput";
import { Resend } from "resend";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";


const baseUrl = "http://localhost:7000/confirm/";

@ObjectType()
class UserInfo {
  @Field()
  isLoggedIn: boolean;

  @Field({ nullable: true })
  email?: String;
}

@ObjectType()
class PaginatedUsers {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalUsersLength: number;
}

@Resolver(User)
export class UserResolver {
  @Query(() => PaginatedUsers)
  async getAllUsers( @Arg("offset") offset: number,
  @Arg("limit") limit: number,  @Arg("role", { nullable: true }) role?: string,  @Arg("search", { nullable: true }) search?: string, ) {
    const query = User.createQueryBuilder("user").leftJoinAndSelect("user.address", "address");
    if (role){
      query.andWhere("user.role = :role", {role})
    }
    if (search){
    query.andWhere("user.first_name ILIKE :search OR user.last_name ILIKE :search OR user.email ILIKE :search", { search: `%${search}%`})
    }
    const totalUsersLength = await query.getCount()
    const users = await query.orderBy("user.id", "ASC").skip(offset).take(limit).getMany()

    return {users: users, totalUsersLength: totalUsersLength};
  }

  @Mutation(() => String)
  async register(@Arg("data") new_user_data: UserInput) {
    const random_code = uuidv4();
    const result = TempUser.save({
      first_name: new_user_data.first_name,
      last_name: new_user_data.last_name,
      email: new_user_data.email,
      phone_number: new_user_data.phone_number,
      hashed_password: await argon2.hash(new_user_data.password),
      random_code: random_code,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "wild-rent@test.anniec.eu",
        to: [new_user_data.email],
        subject: "Verify Email",
        html: `
                <p>Please click the link below to confirm your email adress</p>
                <a href=${baseUrl}${random_code}>
                ${baseUrl}${random_code}</a>
                `,
      });
      if (error) {
        return console.error({ error });
      }
      console.log({ data });
    })();
    console.log("result", result);
    return "Temp user was created, validate with confirmation email";
  }

  @Mutation(() => String)
  async login(@Arg("data") login_user_data: LoginInput, @Ctx() context: any) {
    let is_password_correct = false;
    const user = await User.findOneBy({ email: login_user_data.email });
    if (user) {
      is_password_correct = await argon2.verify(
        user.hashed_password,
        login_user_data.password
      );
    }
    if (is_password_correct === true && user !== null) {
      const token = jwt.sign(
        { email: user.email, user_role: user.role },
        process.env.JWT_SECRET_KEY as jwt.Secret
      );
      context.res.setHeader("Set-Cookie", `token=${token}; Secure; HttpOnly`);

      return "ok";
    } else {
      throw new Error("Incorrect login");
    }
  }

  @Mutation(() => String)
  async logout(@Ctx() context: any) {
    context.res.setHeader(
      "Set-Cookie",
      `token=; Secure; HttpOnly;expires=${new Date(Date.now()).toUTCString()}`
    );
    return "logged out";
  }

  @Query(() => UserInfo)
  async getUserInfo(@Ctx() context: any) {
    if (context.email) {
      return { isLoggedIn: true, email: context.email };
    } else {
      return { isLoggedIn: false };
    }
  }

  @Mutation(() => String)
  async confirmEmail(@Arg("code_by_user") code_by_user: string) {
    const tempUser = await TempUser.findOneByOrFail({
      random_code: code_by_user,
    });
    await User.save({
      first_name: tempUser.first_name,
      last_name: tempUser.last_name,
      email: tempUser.email,
      phone_number: tempUser.phone_number,
      hashed_password: tempUser.hashed_password,
      created_at: new Date
    });
    tempUser.remove();
    return "ok";
  }
}
