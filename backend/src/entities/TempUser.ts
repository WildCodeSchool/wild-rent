import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class TempUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({nullable: true})
  hashed_password: string;

  @Column()
  random_code: string;

  @Column()
  phone_number: string;

  @Column({nullable:true})
  street: string;

  @Column({nullable:true})
  city: string;

  @Column({nullable:true})
  zipcode: string;
}
