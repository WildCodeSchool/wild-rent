import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class ProductOption extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  size: string;

  @Field()
  @Column()
  total_quantity: number;

  @Field()
  @Column()
  available_quantity: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.product_options, {
    eager: true,
  })
  product: Product;
}
