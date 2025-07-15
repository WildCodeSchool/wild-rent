// permet l'utilisation de process.env (example: process.env.RESEND_API_KEY)
import "dotenv/config";
import {
  Query,
  Mutation,
  Resolver,
  Arg,
  Ctx,
  Authorized,
  Int,
  ObjectType,
  Field,
} from "type-graphql";
import { User } from "../entities/User";
import { TempUser } from "../entities/TempUser";
import { UpdateOrCreateUserInput, UserInput } from "../inputs/UserInput";
import { LoginInput } from "../inputs/LoginInput";
import { ContextType } from "../auth";
import { Resend } from "resend";
import * as argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
import Cookies from "cookies";
import { Address } from "../entities/Address";



const baseUrl = "http://localhost:7000/confirmation/";


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
  @Authorized()
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
        subject: "Validation email",
        html: `
                <p>Veuillez cliquer sur le lien suivant pour confirmer votre adresse mail</p>
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
  async login(
    @Arg("data") login_user_data: LoginInput,
    @Ctx() context: ContextType
  ) {
    let is_password_correct = false;
    const user = await User.findOneBy({ email: login_user_data.email });
    if (user) {
      is_password_correct = await argon2.verify(
        user.hashed_password,
        login_user_data.password
      );
    }
    if (is_password_correct === true && user !== null) {
      console.log("user:", user)
      const token = jwt.sign(
        // On signe le jwt avec l'id de l'utilisateur qu'on va ensuite récupérer au moment de déchiffrer le token (auth.ts)
        { id: user.id, email: user.email, user_role: user.role },
        process.env.JWT_SECRET_KEY as jwt.Secret
      );
      const cookies = new Cookies(context.req, context.res);

      cookies.set("token", token, {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 72,
      });

      return "ok";
    } else {
      throw new Error("Incorrect login");
    }
  }

  // Sert pour le front afin de récupérer l'utilisateur courant (via le contexte) sans faire de requête à la BDD
  @Query(() => User, { nullable: true })
  async whoami(@Ctx() context: ContextType): Promise<User | null | undefined> {
    return context.user;
  }

  // Sert pour récupérer les données de l'utilisateur connecté
  @Query(() => User, { nullable: true })
  async getUserInfo(@Ctx() context: ContextType): Promise<User | null> {
    if (context.user) {
      const user = await User.findOneByOrFail({ email: context.user.email });
      return user;
    } else {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() context: ContextType): Promise<boolean> {
    const cookies = new Cookies(context.req, context.res);
    cookies.set("token", "", { maxAge: 0 });
    return true;
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
      created_at: new Date(),
    });
    tempUser.remove();
    return "ok";
  }

  @Mutation(() => String)
    async deleteUser(@Arg("id") id: number, @Ctx() context: any) {
      if(context.user.role !== "ADMIN" && context.user.id !== id){
          throw new Error("Unauthorized")
      }
      const result = await User.delete(id);
      if (result.affected === 1) {
        return "L'utilisateur a bien été supprimé";
      } else {
        throw new Error("L'utilisateur n'a pas été trouvé");
      }
    }


    @Mutation(() => User)
    async editUser(@Arg("data") updateUserData: UpdateOrCreateUserInput,  @Ctx() context: any) {
      if(context.user.role !== "ADMIN" && context.user.email !== updateUserData.email){
          throw new Error("Unauthorized")
      }
      let userToUpdate = await User.findOne({where : {id:updateUserData.id},relations:["address"]} )
      if(!userToUpdate){
        throw new Error("User not found")
      }

      // Modifie les champs users
      userToUpdate.first_name=updateUserData.first_name;
      userToUpdate.last_name = updateUserData.last_name;
      userToUpdate.email = updateUserData.email;
      userToUpdate.phone_number = updateUserData.phone_number;
      userToUpdate.created_at = userToUpdate.created_at;
      userToUpdate.role = updateUserData.role

      // Modifie l'adresse
      if(userToUpdate.address){
        userToUpdate.address.street = updateUserData.street
        userToUpdate.address.city = updateUserData.city
        userToUpdate.address.zipcode = updateUserData.zipcode
        userToUpdate.address.country = "France"
        await userToUpdate.address.save()
      } else {
        const newAddress = Address.create({street:updateUserData.street, city: updateUserData.city, zipcode: updateUserData.zipcode, country: "France"})
        await newAddress.save()
        userToUpdate.address = newAddress
      }

      await userToUpdate.save()

      return userToUpdate
    }

    @Mutation(() => String)
    async addUser(@Arg("data") new_user_data: UpdateOrCreateUserInput) {
    const random_code = uuidv4();
    const result = TempUser.save({
      first_name: new_user_data.first_name,
      last_name: new_user_data.last_name,
      email: new_user_data.email,
      phone_number: new_user_data.phone_number,
      street: new_user_data.street,
      city: new_user_data.city,
      zipcode: new_user_data.zipcode,
      random_code: random_code,
      role: new_user_data.role
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    (async function () {
      const { data, error } = await resend.emails.send({
        from: "wild-rent@test.anniec.eu",
        to: [new_user_data.email],
        subject: "Verify Email",
        html: `
                <p>Veuillez cliquer sur le lien suivant pour compléter votre inscription à Wild Rent</p>
                <a href=http://localhost:7000/confirmation/enregistrement/${random_code}>
                http://localhost:7000/confirmation/enregistrement/${random_code}</a>
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

  @Mutation(() => User)
  async addUserConfirmation( @Arg("random_code") random_code: string,
  @Arg("password") password: string,
) {
    const tempUser = await TempUser.findOneByOrFail({
      random_code: random_code,
    });
    
    const hashed_password= await argon2.hash(password)

    const newAddress = Address.create({street:tempUser.street, city: tempUser.city, zipcode: tempUser.zipcode, country: "France"})
    
    await newAddress.save()

    const userResult = await User.save({
      first_name: tempUser.first_name,
      last_name: tempUser.last_name,
      email: tempUser.email,
      phone_number: tempUser.phone_number,
      hashed_password: hashed_password,
      created_at: new Date(),
      address: newAddress, 
      role: tempUser.role
    });
    await tempUser.remove();

    return userResult
  }
  
}
