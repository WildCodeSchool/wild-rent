import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  id: number;

  @Field()
  title: string;
}
