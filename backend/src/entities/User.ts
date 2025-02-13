import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column({ default: "USER" })
  role: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  hashed_password: string;

  @Field()
  @Column()
  phone_number: string;

  @Field()
  @Column()
  created_at: Date;
}
