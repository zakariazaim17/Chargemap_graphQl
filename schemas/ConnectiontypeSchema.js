import pkg from "apollo-server-express";
const { gql } = pkg;

export default gql`
  type Connectiontype {
    id: ID
    FormalName: String
    Title: String
  }
`;
