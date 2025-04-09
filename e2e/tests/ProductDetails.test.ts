import { test, expect } from "@playwright/test";
import "dotenv/config";

const baseUrl = process.env.LOCAL ? "http://localhost:7000" : "http://api_gateway";

test("test click article and select dates", async ({ page }) => {
  await page.goto(baseUrl + '/produit/7');

  await page.getByRole("textbox", { name: "Début" }).click();
  await page
    .getByRole("option", { name: "Choose 13th," })
    .click();
  await page.getByRole("textbox", { name: "Fin" }).click();
  await page
    .getByRole("option", { name: "Choose Friday, March 14th," })
    .click();
  await expect(page.getByText("Total: 28€")).toHaveText("Total: 28€");

  await page.getByRole("textbox", { name: "Début" }).click();
  await page.getByRole("textbox", { name: "Fin" }).click();
  await page
    .getByRole("option", { name: "Choose Friday, March 28th," })
    .click();
  await expect(page.getByText("Total: 420€")).toHaveText("Total: 420€");
});

// test("add to basket", async ({ page }) => {
//   await page.goto("http://localhost:7000/produit/2");
// });
