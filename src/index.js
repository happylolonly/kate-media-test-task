import express from "express";
import middlewares from "./middlewares/index.js";
import routes from "./routes/index.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const app = express();

middlewares(app);
routes(app);

app.use((err, res, req, next) => {
  console.error(err.stack);
  res.send(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ready on port: ${PORT}`);
});
