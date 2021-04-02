import currenttype from "../models/currenttypes.js";

export default {
  Connection: {
    CurrentTypeID(parent) {
      return currenttype.findById(parent.CurrentTypeID);
    },
  },
};
