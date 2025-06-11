import "dotenv/config";
import "reflect-metadata";
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { dataSource } from "./config/db";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { ProductOptionResolver } from "./resolvers/ProductOptionResolver";
import { createFixtures } from "./fixtures/fixtures";
import { TagResolver } from "./resolvers/TagResolver";
import { OrderResolver } from "./resolvers/OrderResolver";

const start = async () => {
  await dataSource.initialize();

  if (process.env.FIXTURES) {
    console.log("in fixture if");
    await createFixtures();
  }

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CategoryResolver,
      ProductResolver,
      ProductOptionResolver,
      TagResolver,
      OrderResolver,
    ],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie as string);
        if (cookies.token !== undefined) {
          const payload: any = jwt.verify(
            cookies.token,
            process.env.JWT_SECRET_KEY as jwt.Secret
          );
          if (payload) {
            return { email: payload.email, res: res };
          }
        }
      }
      return { res: res };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
};

start();
