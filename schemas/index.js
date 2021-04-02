import pkg from "apollo-server-express";
import stationschema from "./stationschema.js";
import connectionschema from "./connectionsSchema.js";
import connectionstypeschema from "./ConnectiontypeSchema.js";
import currenttypeschema from "./CurrenttypeSchema.js";
import leveltypeschema from "./LeveltypeSchema.js";
const { gql } = pkg;

const linkShema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  linkShema,
  stationschema,
  connectionschema,
  connectionstypeschema,
  currenttypeschema,
  leveltypeschema,
];
