import { Field, InputType, Int } from "type-graphql";

@InputType()
export class OrderInput {
  @Field()
  id?: number;

  @Field()
  created_at?: Date;

  @Field()
  total_price?: number;

  @Field()
  rental_start_date?: Date;

  @Field()
  rental_end_date?: Date;

  @Field()
  status?: string;

  @Field()
  userId: number;

  @Field(() => [Int], { nullable: true })
  products_in_orderIds?: number[];
}
