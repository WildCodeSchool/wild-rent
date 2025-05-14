import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class ProductInOrder extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  total_price: number;

  @ManyToOne(() => Product, { eager: true })
  @Field(() => Product)
  product: Product;

  @Column()
  @Field()
  quantity: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.products_in_order, {
    eager: true,
  })
  order: Order;
}
