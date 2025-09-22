import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class ReservationItem {
  @Field()
  date: Date; // or string if you want a formatted date

  @Field(() => Int)
  reservedQty: number;

  @Field(() => Int)
  availableQty: number;
}

@ObjectType()
export class OptionInventory {
  @Field()
  product: string;

  @Field()
  option: string;

  @Field(() => Int)
  totalQty: number;

  @Field(() => [ReservationItem])
  reservations: ReservationItem[];
}