import { expect, test } from "@playwright/test";

test.describe("API Endpoint tests", () => {
  test("GET /users returns an array", async ({ request }) => {
    const response = await request.get("/users");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test("POST /users creates a new user", async ({ request }) => {
    const response = await request.post("/users", {
      data: {
        name: "John Doe",
        email: "OyXp4@example.com",
      },
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data.name).toBe("John Doe");
    expect(data.email).toBe("OyXp4@example.com");
  });
});
