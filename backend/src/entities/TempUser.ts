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

  @Column()
  hashed_password: string;

  @Column()
  random_code: string;

  @Column()
  phone_number: string;
}
