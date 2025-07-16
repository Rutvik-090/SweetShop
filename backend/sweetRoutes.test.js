import express from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import Sweets from "./models/Sweet.js";
import sweetRouter from "./routes/sweetRoutes.js";

const app = express();
app.use(express.json());
app.use("/sweets", sweetRouter);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Sweets.deleteMany();
});

describe("Sweet Shop API", () => {
  test("should add a sweet", async () => {
    const res = await request(app).post("/sweets/create").send({
      name: "Kaju Katli",
      category: "Nut",
      price: 50,
      quantity: 20,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.sweet.name).toBe("Kaju Katli");
  });

  test("should return all sweets", async () => {
    await Sweets.create({
      name: "Gulab Jamun",
      category: "Milk",
      price: 25,
      quantity: 10,
    });

    const res = await request(app).get("/sweets/view");

    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBe(1);
    expect(res.body.sweets[0].name).toBe("Gulab Jamun");
  });

  test("should purchase a sweet", async () => {
    const sweet = await Sweets.create({
      name: "Rasgulla",
      category: "Milk",
      price: 30,
      quantity: 15,
    });

    const res = await request(app).put(`/sweets/purchase/${sweet._id}`).send({
      quantity: 5,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(10);
  });

  test("should restock a sweet", async () => {
    const sweet = await Sweets.create({
      name: "Soan Papdi",
      category: "Flour",
      price: 20,
      quantity: 5,
    });

    const res = await request(app).put(`/sweets/restock/${sweet._id}`).send({
      quantity: 10,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(15);
  });

  test("should delete a sweet", async () => {
    const sweet = await Sweets.create({
      name: "Jalebi",
      category: "Flour",
      price: 10,
      quantity: 50,
    });

    const res = await request(app).delete(`/sweets/delete/${sweet._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet deleted successfully");
  });
});
