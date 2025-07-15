import { Field, ObjectType, UseMiddleware } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address";
import { Order } from "./Order";
import { IsUser } from "../middleware/AuthChecker";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({ default: "USER" })
  @UseMiddleware(IsUser)
  role: string;

  @Field()
  @Column()
  @UseMiddleware(IsUser)
  email: string;

  @Column()
  hashed_password: string;

  @Field()
  @Column()
  @UseMiddleware(IsUser)
  phone_number: string;

  @Field()
  @Column()
  created_at: Date;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Field(() => Address, { nullable: true })
  @UseMiddleware(IsUser)
  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
    nullable: true
  })
  @JoinColumn()
  address: Address | null;
}
