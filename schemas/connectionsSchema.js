import pkg from "apollo-server-express";
const { gql } = pkg;

export default gql`
  type Connection {
    id: ID
    Quantity: Int
    ConnectionTypeID: Connectiontype
    CurrentTypeID: Currenttype
    LevelID: Leveltype
  }
`;
