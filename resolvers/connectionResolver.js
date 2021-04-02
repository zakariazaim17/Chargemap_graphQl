import connections from "../models/connections.js";

export default {
  Station: {
    Connections(parent) {
      try {
        console.log("Connections", parent);
        return connections.find({ _id: { $in: parent.Connections } });

        // connectionsModel.find({_id: {$in: parent.Connections}});
      } catch (e) {
        console.log(e);
      }
    },
  },
};
