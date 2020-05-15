import mongoose from "mongoose";

const schema = new mongoose.Schema({
  principalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class"
    }
  ]
});

const School = mongoose.model("school", schema);

export default School;
