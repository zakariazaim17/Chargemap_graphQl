import Leveltype from "../models/levels.js";

export default {
  Connection: {
    LevelID(parent) {
      return Leveltype.findById(parent.LevelID);
    },
  },
};
