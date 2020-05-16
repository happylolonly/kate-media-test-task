import express from "express";
import middlewares from "./middlewares/index.js";
import routes from "./routes/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

middlewares(app);
routes(app);

app.use((err, res, req, next) => {
  console.error(err.stack);
  res.send(err);
});

export default app;
