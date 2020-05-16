import mongoose from "mongoose";

const client = mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database`);
});

export default client;
