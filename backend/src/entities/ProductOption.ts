import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { Field, ObjectType } from "type-graphql";
import { ProductInOrder } from "./ProductInOrder";

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

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.product_options, {
    onDelete: "CASCADE",
  })
  product: Product;

  @OneToMany(
    () => ProductInOrder,
    (product_in_order) => product_in_order.productOption
  )
  orders: ProductInOrder[];

  // Ce champ sert seulement à pouvoir renvoyer la valeur de available_quantity qui est calculée dans un resolver
  @Field(() => Number)
  availableQuantity: number;
}
