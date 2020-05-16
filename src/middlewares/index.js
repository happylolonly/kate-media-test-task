import bodyParser from "body-parser";
import UserModel from "../models/user.js";

export async function fakeAuth(req, res, next) {
  // token is user ID
  const token = req.headers.authorization;

  if (!token) {
    res.status(403).end();
  }

  const user = await UserModel.findById(token);
  req.user = user.toJSON();

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
