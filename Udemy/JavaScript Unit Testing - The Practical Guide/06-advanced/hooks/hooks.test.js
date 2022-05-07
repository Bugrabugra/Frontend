import { log } from "console";
import { afterAll, afterEach, beforeAll, beforeEach, expect, it } from "vitest";
import { User } from "./hooks";

const testEmail = "test@test.com";
let user;

beforeAll(() => {
  user = new User(testEmail);
  log("beforeAll()");
});

beforeEach(() => {
  user = new User(testEmail);
  log("beforeEach()");
});

afterEach(() => {
  // user = new User(testEmail);
  log("afterEach()");
});

afterAll(() => {
  log("afterAll()");
});

it.concurrent("should update the email", () => {
  const newTestEmail = "test2@test.com";
  
  user.updateEmail(newTestEmail);
  
  expect(user.email).toBe(newTestEmail);
});

it("should have an email property", () => {
  expect(user).toHaveProperty("email");
});

it("should store the provided email value", () => {
  expect(user.email).toBe(testEmail);
});

it("should clear the email", () => {
  user.clearEmail();

  expect(user.email).toBe("");
});

it("should still have an email property after clearing the email", () => {
  user.clearEmail();

  expect(user).toHaveProperty("email");
});