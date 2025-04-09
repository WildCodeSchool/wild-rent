import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:7000/produit/2");

  await page.getByRole("textbox", { name: "Début" }).click();
  await page
    .getByRole("option", { name: "Choose Wednesday, April 9th," })
    .click();
  await page.getByRole("textbox", { name: "Fin" }).click();
  await page
    .getByRole("option", { name: "Choose Thursday, April 10th," })
    .click();
  await page.getByRole("button", { name: "Ajouter au panier" }).click();

  await expect(page.getByText("Mon panier (1)")).toBeVisible();
});
