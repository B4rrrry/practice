import { test, expect } from "@playwright/test";

test.describe("test users page", () => {
  test("test users table, view first user", async ({ page }) => {
    await page.goto("http://localhost:5173/users");

    await expect(page.getByRole("heading", { name: "Users" })).toHaveText(
      "Users",
    );

    await expect(page.getByTestId("users-table")).toBeVisible();

    await expect(page.getByText("Alex Morgan")).toHaveText("Alex Morgan");
    await page.getByRole("link", { name: "View" }).first().click();
    await expect(page.getByText("Users Name")).toHaveText(
      "Users Name Alex Morgan",
    );
  });

  test("test search and open user", async ({ page }) => {
    await page.goto("http://localhost:5173/users");

    await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
    const search = page.getByPlaceholder("Search...");
    await search.fill("kim");
    await expect(page.getByText("Daniel Kim")).toBeVisible();
    await page.getByRole("link", { name: "View" }).click();
    await expect(page.getByText("Daniel Kim")).toBeVisible();
  });

  test("search users and no users found", async ({ page }) => {
    await page.goto("http://localhost:5173/users");
    await page.getByPlaceholder("Search...").fill("kek");
    await expect(page.getByText("No users found")).toBeVisible();
  });
});

test.describe("test tasks page", () => {
  test("open tasks page and first task", async ({ page }) => {
    await page.goto("http://localhost:5173/tasks");
    await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
    await expect(page.getByText("Add empty states")).toBeVisible();
    await page.getByRole("link", { name: "View" }).first().click();
    await expect(page.getByRole("heading", { name: "Task" })).toHaveText(
      "Task Add empty states",
    );
  });
});

test("test navigation", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(
    page.getByRole("heading", { name: "Dashboard Statistic" }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Users" }).click();
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();

  await page.getByRole("link", { name: "Tasks" }).click();
  await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
});

test("test 404 not found page", async ({ page }) => {
  await page.goto("http://localhost:5173/userrrrr");
  await expect(page.getByText("NotFoundPage")).toBeVisible();
});
