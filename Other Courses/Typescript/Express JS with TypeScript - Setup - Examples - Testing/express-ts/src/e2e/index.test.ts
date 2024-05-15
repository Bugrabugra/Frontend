import request from "supertest";
import { createApp } from "../createApp";
import { type Express } from "express";

describe("users", () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  it("should return an empty array when getting /api/users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.body).toStrictEqual([]);
  });
});

