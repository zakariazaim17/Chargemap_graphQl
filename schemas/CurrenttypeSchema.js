import pkg from "apollo-server-express";
const { gql } = pkg;

export default gql`
  type Currenttype {
    id: ID
    Description: String
    Title: String
  }
`;
