const { gql } = require('apollo-server');

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String
    password: String
  }

  extend type Query {
    getUsers: [User]
  }

  extend type Mutation {
    createUser(password: String!, email: String!): User
  }
`;

module.exports = userTypeDefs;
