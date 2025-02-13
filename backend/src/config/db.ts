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

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  username: "admin",
  database: "db_wild_rent",
  password: "locationsauvage",
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
  ],
  synchronize: true,
  logging: ["error", "query"],
});
