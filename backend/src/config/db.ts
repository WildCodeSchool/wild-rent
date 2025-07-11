import { ProductInOrder } from "../entities/ProductInOrder";
import { DataSource } from "typeorm";
import { TempUser } from "../entities/TempUser";
import { Address } from "../entities/Address";
import { ForgotPassword } from "../entities/ForgotPassword";
import { ProductOption } from "../entities/ProductOption";
import { Category } from "../entities/Category";
import { Order } from "../entities/Order";
import { Picture } from "../entities/Picture";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { Tag } from "../entities/Tag";
import dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: ".env.db" });

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.CI ? "localhost" : "db",
  username: process.env.POSTGRES_USERNAME,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    User,
    ProductInOrder,
    Order,
    TempUser,
    Address,
    ForgotPassword,
    ProductOption,
    Category,
    Picture,
    Product,
    Tag,
  ],
  synchronize: true,
  logging: ["error", "query"],
});
console.log(process.env.CI);
