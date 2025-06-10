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

const start = async () => {
  await dataSource.initialize();

  // Active l'extension 'unaccent' sur postgress pour des recherches qui ne prend pas en compte les accents
  try {
    await dataSource.query(`CREATE EXTENSION IF NOT EXISTS unaccent;`);
    console.log("✔ Extension unaccent activée");
  } catch (err) {
    console.warn("⚠ Impossible d'activer unaccent :", err.message);
  }

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
