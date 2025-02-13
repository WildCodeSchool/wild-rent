import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { dataSource } from "./config/db";
import "reflect-metadata";

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver, ProductResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");
};

start();
