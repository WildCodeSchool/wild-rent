import { User } from "../entities/User";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email: string;

    @Field()
    phone_number: string;

    @Field()
    password: string;
}