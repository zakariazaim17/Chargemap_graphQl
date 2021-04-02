import Connectiontype from "../models/connectiontype.js";

export default {
  Connection: {
    ConnectionTypeID(parent) {
      console.log("connectionType!!");
      return Connectiontype.findById(parent.ConnectionTypeID);
    },
  },
};
