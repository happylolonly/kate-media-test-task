import mongoose from "mongoose";

const schema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School"
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
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
  ],
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule"
  }
});

schema.pre("save", next => {
  // not sure about this

  if (!this.schoolId || !this.teacherId) {
    next("Class should belongs to School or Teacher");
    return;
  }

  // if (this.schoolId) {
  //   delete this.teacherId;
  //   // allow teachers array
  // } else if (this.teacherId) {
  //   delete this.schoolId;
  //   delete this.teachers;
  // }
});

const Class = mongoose.model("class", schema);

export default Class;
