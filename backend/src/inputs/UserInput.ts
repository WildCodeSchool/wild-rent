import { User } from "../entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  first_name?: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  phone_number: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  userId: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  phone_number: string;
}

@InputType()
export class UpdateOrCreateUserInput {
  @Field({ nullable: true })
  id: number;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  phone_number: string;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  zipcode: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  created_at: Date;
}
