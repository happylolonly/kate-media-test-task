import express from "express";
import { ROLES } from "../models/user.js";
import ClassModel from "../models/class.js";
import UserModel from "../models/user.js";

import { allowedRoles } from "../middlewares/index.js";

const router = express.Router();

function processClass() {
  return async (req, res, next) => {
    const { id } = req.params;

    const classItem = await ClassModel.findById(id);

    if (!classItem) {
      res.status(404).send("Class not exists");
      return;
    }

    req.classItem = classItem.toJSON();
    next();
  };
}

function checkStudentExistence(id) {
  const student = UsersModel.findById(id);

  return !!student;
}

router.get("/", allowedRoles(ROLES.TEACHER), async (req, res) => {
  const teacherId = req.user._id;

  const students = await ClassModel.find({
    $or: [{ teacherId }, { teachers: { $in: [teacherId] } }]
  }).populate("students");

  res.send(students);
});

router.post("/", allowedRoles(ROLES.TEACHER), async (req, res) => {
  const classItem = new ClassModel({
    teacherId: req.user._id
  });

  await classItem.save();

  res.status(201).send(classItem);
});

router.delete(
  "/:id",
  allowedRoles(ROLES.TEACHER),
  processClass(),
  async (req, res) => {
    // TODO: delete class
  }
);

router.get(
  "/:id/students",
  allowedRoles(ROLES.TEACHER),
  processClass(),
  async (req, res) => {
    const { id } = req.params;

    const students = await ClassModel.findById(id).populate("students");
    res.send(students);
  }
);

router.post(
  "/:id/students",
  allowedRoles(ROLES.TEACHER),
  processClass(),
  async (req, res) => {
    const { studentId } = req.body;

    if (!studentId) {
      res.status(400).send("studentId is required");
      return;
    }

    if (!checkStudentExistence(studentId)) {
      res.status(404).send("Student doesn't exist");
      return;
    }

    if (classItem.students.includes(studentId)) {
      res.status(400).send("Class already has had this student");
      return;
    }

    classItem.students.push(studentId);
    await ClassModel.update(
      { _id: classItem.id },
      { students: classItem.students }
    );
    res.send(classItem);
  }
);

router.delete(
  "/:id/students/:studentId",
  allowedRoles(ROLES.TEACHER),
  processClass(),
  async (req, res) => {
    res.status(200).end();

    if (!checkStudentExistence(studentId)) {
      res.status(404).send("Student doesn't exist");
      return;
    }

    // await ClassModel
  }
);

export default router;
