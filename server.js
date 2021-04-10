import pkg from "apollo-server-express";
const { ApolloServer } = pkg;
import express from "express";
import connectMongo from "./db/db.js";
import dotenv from "dotenv";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import bcrypt from "bcrypt";
import helmet from "helmet";
import pkk from "./passport/authenticate.js";
const { checkAuth } = pkk;

dotenv.config();
const app = express();

(async () => {
  try {
    const conn = await connectMongo();
    if (conn) {
      console.log("Connected to db!");
    }

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, res }) => {
        if (req) {
          const user = await checkAuth(req, res);
          console.log("app", user);
          return {
            req,
            res,
            user,
          };
        }
      },
    });

    server.applyMiddleware({ app });

    app.listen({ port: 3002 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:3002${server.graphqlPath}`
      );
    });
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
