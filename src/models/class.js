import mongoose from "mongoose";

const schema = new mongoose.Schema({
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});
const Class = mongoose.model("class", schema);

export default Class;
