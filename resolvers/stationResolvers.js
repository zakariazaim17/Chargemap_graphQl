import stations from "../models/stations.js";
import conectionn from "../models/connections.js";
import connectionType from "../models/connectiontype.js";
import currrentType from "../models/currenttypes.js";
import levelType from "../models/levels.js";
import pkg from "apollo-server-express";
const { AuthenticationError } = pkg;

const rectangleBounds = (topRight, bottomLeft) => ({
  type: "Polygon",
  coordinates: [
    [
      [bottomLeft.lng, bottomLeft.lat],
      [bottomLeft.lng, topRight.lat],
      [topRight.lng, topRight.lat],
      [topRight.lng, bottomLeft.lat],
      [bottomLeft.lng, bottomLeft.lat],
    ],
  ],
});

export default {
  Query: {
    stations: (parent, args) => {
      return stations.find().limit(10);
    },
    station: (parent, args) => {
      return stations.find().skip(args.start).limit(args.limit);
    },
    GetById: (parent, args) => {
      return stations.findById(args.id);
    },
    GetByCoordinates: async (parent, args) => {
      const frameofSearch = rectangleBounds(
        args.bounds._northEast,
        args.bounds._southWest
      );
      return await stations.find({
        Location: {
          $geoWithin: {
            $geometry: {
              type: frameofSearch.type,
              coordinates: frameofSearch.coordinates,
            },
          },
        },
      });
    },
    connectiontypes: (parent, args) => {
      return connectionType.find().limit(10);
    },
    currenttypes: (parent, args) => {
      return currrentType.find().limit(10);
    },
    leveltypes: (parent, args) => {
      return levelType.find().limit(10);
    },
  },
  Mutation: {
    addStation: async (parent, args) => {
      console.log(args);
      try {
        if (!user) {
          return new AuthenticationError("You are not authenticated!");
        }
        const connection = await Promise.all(
          args.Connections.map(async (con) => {
            let newconn = new conectionn(con);
            const result = await newconn.save();
            return result.id;
          })
        );

        let newStation = new stations({
          ...args,
          Connections: connection,
        });

        return newStation.save();
      } catch (e) {
        console.log(e);
      }
    },
    modifyStation: async (parent, args) => {
      try {
        if (args.Connections) {
          const conn = await Promise.all(
            args.Connections.map(async (con) => {
              const result = await conectionn.findByIdAndUpdate(con.id, con, {
                new: true,
              });
              return result;
            })
          );
        }

        let newStation = {
          Title: args.Title,
          AddressLine1: args.AddressLine1,
          Town: args.Town,
          StateOrProvince: args.StateOrProvince,
          Postcode: args.Postcode,
        };
        return await stations.findByIdAndUpdate(args.id, newStation, {
          new: true,
        });
      } catch (e) {
        console.log("modify_station_error", e);
      }
    },

    deleteStation: async (parent, args) => {
      try {
        console.log(args.id);
        return await stations.findOneAndDelete({ _id: args.id });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
