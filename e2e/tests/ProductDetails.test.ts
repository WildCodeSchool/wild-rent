import { test, expect } from "@playwright/test";

test("test click article and add cart", async ({ page }) => {
  await page.goto("http://localhost:7000/produit/1");
  await page.getByRole('button', { name: 'Début de la location Fin de' }).click();
  await page.getByRole('button', { name: 'Sunday, August 24th,' }).click();
  await page.getByRole('button', { name: 'Sélectionnez une date' }).click();
  await page.getByRole('button', { name: 'Wednesday, August 27th,' }).click();
  await page.getByRole('button').nth(3).click();
  await page.getByText("15€ / jour");
  await page.getByLabel('Sélecteur d\'options').selectOption('{"id":1,"size":"150 cm"}');
  await page.getByRole("button", { name: "Ajouter au panier" }).click();
  await expect(page.getByText("Mon panier (1)")).toBeVisible();
});
