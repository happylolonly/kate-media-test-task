import { ROLES } from "../models/user.js";
import SchoolModel from "../models/school.js";
import UserModel from "../models/user.js";

import express from "express";
import { allowedRoles } from "../middlewares/index.js";
const router = express.Router();

function processSchool() {
  return async (req, res, next) => {
    const { id } = req.params;

    const school = await SchoolModel.findById(id);

    if (!school) {
      res.status(404).send("School not exists");
      return;
    }
    req.school = school.toJSON();
    next();
  };
}

function validatePrincipal() {
  return (req, res, next) => {
    if (req.school.principalId.toString() !== req.user._id.toString()) {
      res.status(403).end();
      return;
    }

    next();
  };
}

router.get(
  "/",
  allowedRoles(ROLES.PRINCIPAL, ROLES.TEACHER),
  async (req, res) => {
    const schools = await SchoolModel.find({});

    res.send(schools);
  }
);

router.post("/", allowedRoles(ROLES.PRINCIPAL), async (req, res) => {
  const school = new SchoolModel({
    principalId: req.user._id
  });

  await school.save();

  res.status(201).send(school);
});

router.get(
  "/:id/students",
  allowedRoles(ROLES.PRINCIPAL, ROLES.TEACHER),
  processSchool(),
  async (req, res) => {
    const { id } = req.params;

    // const students = await SchoolModel.findById(id).populate("classes");
    // res.send(req.school.teachers);
  }
);

router.get(
  "/:id/teachers",
  allowedRoles(ROLES.PRINCIPAL, ROLES.TEACHER),
  processSchool(),
  async (req, res) => {
    res.send(req.school.teachers);
  }
);

router.post(
  "/:id/teachers",
  allowedRoles(ROLES.PRINCIPAL),
  processSchool(),
  validatePrincipal(),
  async (req, res) => {
    const { teacherId } = req.body;
    const { id } = req.params;

    if (!teacherId) {
      res.status(400).send("teacherId is required");
      return;
    }
    const { school } = req;
    const teacher = await UserModel.findById(teacherId);

    if (!teacher) {
      res.status(404).send("Teacher not exists");
      return;
    }

    if (teacher.role !== ROLES.TEACHER) {
      res.status(400).send("teacherId not a teacher");
      return;
    }

    if (school.teachers.includes(teacherId)) {
      res.status(400).send("School already have this teacher");
      return;
    }

    school.teachers.push(teacherId);
    await SchoolModel.updateOne({ _id: id }, { teachers: school.teachers });

    res.status(200).end("Teacher added to school");
  }
);

router.delete(
  "/:id/teachers/:teacherId",
  allowedRoles(ROLES.PRINCIPAL),
  processSchool(),
  validatePrincipal(),
  async (req, res) => {
    const { teacherId } = req.params;
    const { school } = req;

    if (!school.teachers.includes(teacherId)) {
      res.status(400).send("School don't have this teacher");
      return;
    }

    const index = school.teachers.indexOf(teacherId);
    school.teachers.splice(index, 1);

    await SchoolModel.updateOne(
      { _id: school._id },
      { teachers: school.teachers }
    );

    res.send("Teacher deleted from school");
  }
);

// or reuse teachers logic for assigning student's routes or create new routes

export default router;
