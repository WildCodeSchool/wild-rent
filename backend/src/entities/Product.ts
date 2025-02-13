import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { Picture } from "./Picture";
import { ProductOption } from "./ProductOption";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: number;

  @Field(() => [Picture])
  @OneToMany(() => Picture, (picture) => picture.product, {
    cascade: true, // lorsque nous sauvegardons un produit, nous voulons sauvegarder les images, et suppr cascade coté code
    eager: true, // lorsque nous demandons un produit, nous voulons les images
    onDelete: "CASCADE", // supprimer les images si le produit est supprimé, et suppr cascade coté BDD
  })
  pictures: Picture[];

  @Field(() => [ProductOption])
  @OneToMany(() => ProductOption, (product_option) => product_option.product, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
  })
    product_options: ProductOption[];

  @Field()
  @Column()
  created_at: Date;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  category: Category;
}
