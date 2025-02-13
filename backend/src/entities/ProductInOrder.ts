import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class ProductInOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  total_price: number;

  @Column()
  @Field()
  quantity: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.products_in_order, {
    eager: true,
  })
  order: Order;
}
