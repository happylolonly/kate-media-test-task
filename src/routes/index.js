import schoolsRoutes from "./schools.js";
import userRoutes from "./users.js";
import classesRoutes from "./classes.js";

import { fakeAuth } from "../middlewares/index.js";

export default app => {
  app.use("/users", userRoutes);

  app.use("/schools", fakeAuth, schoolsRoutes);
  app.use("/classes", fakeAuth, classesRoutes);

  // maybe add students routes for 'get students of school/class' requirements
};
