import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CurrentTypes = new Schema({
  Title: String,
  Description: String,
});

export default mongoose.model("currenttypes", CurrentTypes);
