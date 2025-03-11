import { test, expect } from "@playwright/test";

test("Go to home page", async ({ page }) => {
  await page.goto("http://api_gateway/");

  await page.waitForLoadState("networkidle");
  await expect(page.getByText("Wild Rent")).toBeVisible();
});