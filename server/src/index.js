const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
require("dotenv").config(); // Load environment variables

const startServer = async () => {
  const app = express();
  await connectDB();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath} 🔥`
    );
  });
};

startServer();
