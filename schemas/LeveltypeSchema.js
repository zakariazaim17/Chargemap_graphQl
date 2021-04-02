import pkg from "apollo-server-express";
const { gql } = pkg;

export default gql`
  type Leveltype {
    id: ID
    Comments: String
    Title: String
    IsFastChargeCapable: Boolean
  }
`;
