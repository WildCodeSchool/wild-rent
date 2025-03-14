import { test, expect } from "@playwright/test";

test("test click article and select dates", async ({ page }) => {
  await page.goto("http://localhost:7000/produit/2");

  await page.getByRole("textbox", { name: "Début" }).click();
  await page
    .getByRole("option", { name: "Choose Thursday, March 13th," })
    .click();
  await page.getByRole("textbox", { name: "Fin" }).click();
  await page
    .getByRole("option", { name: "Choose Friday, March 14th," })
    .click();
  await expect(page.getByText("Total: 3€")).toHaveText("Total: 3€");

  await page.getByRole("textbox", { name: "Début" }).click();
  await page.getByRole("textbox", { name: "Fin" }).click();
  await page
    .getByRole("option", { name: "Choose Friday, March 28th," })
    .click();
  await expect(page.getByText("Total: 45€")).toHaveText("Total: 45€");
});

test("add to cart", async ({ page }) => {
  await page.goto("http://localhost:7000/produit/2");
});
