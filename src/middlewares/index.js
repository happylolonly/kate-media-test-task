import bodyParser from "body-parser";
import UserModel from "../models/user.js";

export async function fakeAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token && !fakeAuth[token]) {
    res.status(403).end();
  }

  const fakeRoles = {
    1: "principal",
    2: "teacher",
    3: "student"
  };

  const user = await UserModel.find({ role: fakeRoles[token] });
  req.user = user[0].toJSON();

  console.log("Token:", token);
  console.log("User:", user);

  next();
}

export function allowedRoles(...roles) {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}

export default app => {
  app.use(bodyParser.json({ type: "application/*+json" }));
  app.use(bodyParser.urlencoded({ extended: false }));
};
