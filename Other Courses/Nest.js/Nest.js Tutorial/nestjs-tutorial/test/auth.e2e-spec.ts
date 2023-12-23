import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "./../src/app.module";
import * as request from "supertest";
import * as session from "express-session";
import { TypeormStore } from "connect-typeorm";
import * as passport from "passport";
import { SessionEntity } from "../src/typeorm";

describe("UsersController (e2e) test", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix("api");

    const sessionRepository = app
      .get(AppModule)
      .getDataSource()
      .getRepository(SessionEntity);

    app.use(
      session({
        name: "NESTJS_SESSION_ID",
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000
        },
        store: new TypeormStore().connect(sessionRepository)
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  describe("Authentication", () => {
    const URL = "/api/auth/login";
    let cookie = "";

    it("should login", (done) => {
      request(app.getHttpServer())
        .post(URL)
        .send({
          username: "testusertest",
          password: "testusertest"
        })
        .expect(201)
        .end((err, res) => {
          cookie = res.headers["set-cookie"];
          done();
        });
    });

    it("should visit /api/users and return 200", async () => {
      return request(app.getHttpServer())
        .get("/api/users")
        .set("Cookie", cookie)
        .expect(200);
    });
  });
});
