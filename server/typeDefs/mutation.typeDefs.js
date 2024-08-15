const { gql } = require('apollo-server');

const mutationTypeDefs = gql`
  type Mutation {
    createUser(password: String!, email: String!): User
  }
`;

module.exports = mutationTypeDefs;
