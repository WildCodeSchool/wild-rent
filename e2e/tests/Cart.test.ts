import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:7000";


test("Panier : ajout produit, sélection dates, modification quantité, suppression", async ({
  page,
}) => {
  await page.goto(`${baseUrl}/produit/1`);
  await page.getByRole('button', { name: 'Début de la location Fin de' }).click();
  await page.getByRole('button', { name: 'Sunday, August 24th,' }).click();
  await page.getByRole('button', { name: 'Sélectionnez une date' }).click();
  await page.getByRole('button', { name: 'Wednesday, August 27th,' }).click();
  await page.getByRole('button').nth(3).click();

  await page.getByRole("combobox").selectOption('{"id":1,"size":"150 cm"}');

  await page.getByRole("button", { name: "Ajouter au panier" }).click();

  await page.getByRole("link", { name: "cart Mon panier (1)" }).click();

  await page.goto(`${baseUrl}/panier`);

  await expect(page.getByText("Total: 45€")).toBeVisible();

  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByText("2", { exact: true })).toBeVisible();

  await expect(page.getByText("Total: 90€")).toBeVisible();

  // Diminue la quantité
  await page.getByRole("button", { name: "-" }).click();
  await expect(page.getByText("1", { exact: true })).toBeVisible();

  // Supprime le produit
  await page.getByRole("button", { name: "corbeille" }).click();

  // Vérifie que le panier est vide
  await expect(page.getByText("Votre panier est vide")).toBeVisible();
});
