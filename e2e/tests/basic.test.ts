import { test, expect } from "@playwright/test";

const baseUrl = process.env.LOCAL
  ? "http://localhost:7000"
  : "http://api_gateway/";

test("Go to home page", async ({ page }) => {
  await page.goto(baseUrl);

  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Wild Rent")).toBeVisible();
});
