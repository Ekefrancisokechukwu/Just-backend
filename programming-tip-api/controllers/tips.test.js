const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Tip express test", () => {
  jest.setTimeout(10000);

  it("should create a new tip", async () => {
    const tip = {
      title: "Effective Use of TypeScript Generics",
      description: "Generics allow you to create",
      language: "TypeScript",
      tags: ["generics"],
    };
    const response = await request(app).post("/api/v1/tips").send(tip);

    expect(response.status).toBe(201);
    expect(response.body.tip).toHaveProperty("title");
  });

  it("should get  all tips", async () => {
    const response = await request(app).get("/api/v1/tips");

    expect(response.status).toBe(200);
  });
});
