import pkg from "apollo-server-express";
const { gql } = pkg;

export default gql`
  extend type Query {
    user(id: ID): User
    login(username: String!, password: String!): User
  }

  extend type Mutation {
    registerUser(username: String!, password: String!, full_name: String!): User
  }

  type User {
    id: ID
    username: String
    full_name: String
    password: String
    token: String
  }
`;
