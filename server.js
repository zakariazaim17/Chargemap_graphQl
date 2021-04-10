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
import localhost from "./secutity/localhost.js";
import production from "./secutity/production.js";

dotenv.config();
const app = express();
app.use(helmet.hidePoweredBy());
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

    process.env.NODE_ENV = process.env.NODE_ENV || "development";
    if (process.env.NODE_ENV === "production") {
      production(app, 3000);
    } else {
      localhost(app, 8000, 3000);
    }

    /*app.listen({ port: 3002 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:3002${server.graphqlPath}`
      );
    });
   
  */
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
