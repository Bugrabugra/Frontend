import { test, expect } from "@playwright/test";

test.describe("UI End-to-End Tests", () => {
  test("Home page has navigation links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("Full Stack Playwright Demo");
    await expect(page.locator("nav a", { hasText: "Users" })).toBeVisible();
    await expect(page.locator("nav a", { hasText: "Posts" })).toBeVisible();
  });

  test("Create a new user", async ({ page }) => {
    await page.goto("/users");
    await page.locator('input[placeholder="Name"]').fill("Alice");
    await page.locator('input[placeholder="Email"]').fill("alice@example.com");
    await page.locator("button", { hasText: "Add User" }).click();
    await expect(
      page.locator("li", { hasText: "alice@example.com" }),
    ).toBeVisible();
  });

  test("Create a new post", async ({ page }) => {
    await page.goto("/posts");
    await page.locator('input[placeholder="Title"]').fill("New Post");
    await page.locator("textarea").fill("This is the content of the post.");
    await page.locator("button", { hasText: "Add Post" }).click();
    await expect(page.locator("li", { hasText: "New Post" })).toBeVisible();
  });
});
