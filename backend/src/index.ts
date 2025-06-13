import "dotenv/config";
import "reflect-metadata";
<<<<<<< HEAD
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie";
=======
>>>>>>> f8278616 (refactor(#37): découpe la partie pour récupérer l'utilisateur connecté via le contexte)
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import { createFixtures } from "./fixtures/fixtures";
import { getSchema } from "./schema";
import { ContextType, getUserFromContext } from "./auth";

const start = async () => {
  await dataSource.initialize();

  if (process.env.FIXTURES) {
    await createFixtures();
  }

  const schema = await getSchema();

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
<<<<<<< HEAD
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

=======
      const context: ContextType = {
        req,
        res,
        user: undefined,
      };
      const user = await getUserFromContext(context);
      context.user = user;
      return context;
    },
  });
>>>>>>> f8278616 (refactor(#37): découpe la partie pour récupérer l'utilisateur connecté via le contexte)
  console.log(`🚀 Server listening at: ${url}`);
};

start();
