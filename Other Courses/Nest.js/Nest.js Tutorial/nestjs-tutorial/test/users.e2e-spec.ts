import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "./../src/app.module";
import * as request from "supertest";

describe("UsersController (e2e) test", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");

    await app.init();
  });

  describe("Creating new users POST /api/users/create", () => {
    const CREATE_USER_URL = "/api/users/create";

    it("should create a new user", () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: "ansonanson",
          password: "ansonanson",
          email: "anson@gmail.com"
        })
        .expect(201);
    });

    it("should return a 400 when invalid username is provided", () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: "an",
          password: "ansonanson",
          email: "anson@gmail.com"
        })
        .expect(400);
    });

    it("should return a 400 when invalid password is provided", () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: "anson_nestjs",
          password: "sada",
          email: "anson@gmail.com"
        })
        .expect(400);
    });

    it("should return a 400 when invalid email is provided", () => {
      return request(app.getHttpServer())
        .post(CREATE_USER_URL)
        .send({
          username: "anson_nestjs",
          password: "sadaasdasdasdas",
          email: "anson"
        })
        .expect(400);
    });
  });
});
