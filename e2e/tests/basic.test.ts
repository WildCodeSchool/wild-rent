import { test, expect } from "@playwright/test";

const baseUrl = process.env.LOCAL
  ? "http://localhost:7000"
  : "http://api_gateway/";

test("test click article and select dates", async ({ page }) => {
  await page.goto("http://localhost:7000/");

  await page.locator(".embla__slide").first().click();

  await page.getByRole("textbox", { name: "Début" }).click();
  await page
    .getByRole("option", { name: "Choose Wednesday, March 12th," })
    .click();

  await page.getByRole("textbox", { name: "Fin" }).click();
  await page
    .getByRole("option", { name: "Choose Thursday, March 13th," })
    .click();

  await expect(page.getByText("Total: 28€")).toHaveText("Total: 28€");
});
