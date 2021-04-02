import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LevelTypes = new Schema({
  Title: String,
  Comments: String,
  IsFastChargeCapable: Boolean,
});

export default mongoose.model("levels", LevelTypes);
