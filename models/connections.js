import mongoose from "mongoose";
const Schema = mongoose.Schema;
import levels from "./levels.js";
import connectiontypes from "./connectiontype.js";
import currenttypes from "./currenttypes.js";

const ConnectionsSchema = new Schema({
  Quantity: Number,
  ConnectionTypeID: [{ type: mongoose.Types.ObjectId, ref: connectiontypes }],
  CurrentTypeID: [{ type: mongoose.Types.ObjectId, ref: currenttypes }],
  LevelID: [{ type: mongoose.Types.ObjectId, ref: levels }],
});

export default mongoose.model("connections", ConnectionsSchema);
