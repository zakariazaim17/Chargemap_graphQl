import pkg from "apollo-server-express";
const { gql } = pkg;

export default gql`
  extend type Query {
    stations: [Station]
    station(start: Int, limit: Int): [Station]
    GetById(id: ID): Station
    GetByCoordinates(bounds: Bounds): [Station]
    connectiontypes: [connectiontypes]
    currenttypes: [currenttype]
    leveltypes: [leveltype]
  }
  input Bounds {
    _southWest: LatLng
    _northEast: LatLng
  }
  input LatLng {
    lat: Float
    lng: Float
  }
  input Coord {
    type: String = "Point"
    coordinates: [Float]
  }
  input Conn {
    ConnectionTypeID: ID
    CurrentTypeID: ID
    LevelID: ID
    Quantity: Int
  }
  input conn {
    id: ID
    ConnectionTypeID: ID
    CurrentTypeID: ID
    LevelID: ID
    Quantity: Int
  }
  type Station {
    id: ID
    Title: String
    Town: String
    AddressLine1: String
    StateOrProvince: String
    Postcode: String
    Location: Detail
    Connections: [Connection]
  }
  type Detail {
    type: String
    coordinates: [Float]
  }
  type connectiontypes {
    id: ID
    FormalName: String
    Title: String
  }
  type currenttype {
    id: ID
    Description: String
    Title: String
  }
  type leveltype {
    id: ID
    Comments: String
    Title: String
    IsFastChargeCapable: Boolean
  }

  extend type Mutation {
    addStation(
      Title: String
      Postcode: String
      AddressLine1: String
      StateOrProvince: String
      Town: String
      Location: Coord
      Connections: [Conn]
    ): Station

    modifyStation(
      id: ID
      Connections: [conn]
      Postcode: String
      Title: String
      AddressLine1: String
      StateOrProvince: String
      Town: String
    ): Station

    deleteStation(id: ID): Station
  }
`;
