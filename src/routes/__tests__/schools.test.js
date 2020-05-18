import app from "../../app";
import UserModel, { ROLES } from "../../models/user.js";
import request from "supertest";

import mongoose from "mongoose";

// TODO: move init/close logic to db module

describe("Schools route - /schools", () => {
  let db;

  async function createUser(role) {
    const user = new UserModel({ role });
    await user.save();
    return user;
  }

  beforeAll(async () => {
    db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true
    });

    // console.log(process.env.MONGODB_URI);
    // const collections = await mongoose.connection.db.collections();

    // for (let collection of collections) {
    //   await collection.remove();
    // }
  });

  afterAll(async () => {
    // remove all users and close
    //   await User.remove({});
    db.close();
  });

  test("POST - /school - create school", async done => {
    const user = await createUser(ROLES.PRINCIPAL);

    const response = await request(app)
      .post("/schools")
      .set({ Authorization: user._id });

    expect(response.statusCode).toBe(201);
    expect(response.body.principalId).toBe(user._id.toString());
    done();
  });
});
