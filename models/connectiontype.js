import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ConnectionTypes = new Schema({
  FormalName: String,
  Title: String,
});

export default mongoose.model("connectiontypes", ConnectionTypes);
