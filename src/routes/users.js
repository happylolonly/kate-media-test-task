import UserModel, { ROLES } from "../models/user.js";

import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { role } = req.body;
  console.log(role);

  if (!role) {
    res.status(400).send("Role is required");
    return;
  }

  if (!Object.values(ROLES).includes(role)) {
    res.status(400).send("Role not exists");
    return;
  }

  const user = new UserModel({
    role
  });

  await user.save();

  res.status(201).send(user);
});

export default router;
