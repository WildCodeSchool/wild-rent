import { User } from "../entities/User";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  username: "admin",
  database: "db_wild_rent",
  password: "locationsauvage",
  entities: [User],
  synchronize: true,
  logging: ["error", "query"],
});
