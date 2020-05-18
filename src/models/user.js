import mongoose from "mongoose";

export const ROLES = {
  PRINCIPAL: "principal",
  TEACHER: "teacher",
  STUDENT: "student"
};

const schema = new mongoose.Schema({
  role: {
    type: String,
    enum: Object.values(ROLES),
    required: true
  }
  // scheduleId ?
});
const User = mongoose.model("User", schema);

export default User;
