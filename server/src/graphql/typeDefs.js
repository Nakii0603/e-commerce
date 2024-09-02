const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    password: String!
    email: String!
  }

  type Query {
    hello: String
    users: [User]
  }

  type Mutation {
    addUser(password: String!, email: String!): User
  }
`;

module.exports = typeDefs;
