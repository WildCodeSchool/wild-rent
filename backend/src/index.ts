import "dotenv/config";
import "reflect-metadata";
import * as jwt from "jsonwebtoken";
import * as cookie from 'cookie';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { dataSource } from "./config/db";
import { CategoryResolver } from "./resolvers/CategoryResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { ProductOptionResolver } from "./resolvers/ProductOptionResolver";
import { createFixtures } from "./fixtures/fixtures";

const waitForDB = async (retries = 10, delay = 2000) => {
  while (retries) {
    try {
      await dataSource.initialize();
      console.log("Database connected");
      return;
    } catch (err) {
      console.log("Waiting for DB...", retries);
      retries--;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error("Failed to connect to DB");
};

const start = async () => {
  await waitForDB()

  if (process.env.FIXTURES) {
    console.log("in fixture if")
    await createFixtures();
  }

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CategoryResolver,
      ProductResolver,
      ProductOptionResolver,
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
                const payload: any = jwt.verify(cookies.token, process.env.JWT_SECRET_KEY as jwt.Secret);
                if (payload) {
                    return { email: payload.email, res: res };
                }
            }
        }
        return { res: res };
    }
});

  console.log(`🚀 Server listening at: ${url}`);
};

start();
