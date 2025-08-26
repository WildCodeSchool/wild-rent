import { test, expect } from "@playwright/test";

const baseUrl = "http://localhost:7000";

// Format de date pour le calendrier (choix des options du sélecteur)
function formatDate(day: number): string {
  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), day);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  return `Choose ${weekday}, ${month} ${day}th,`;
}

const date16 = formatDate(16);
const date19 = formatDate(19);

test("Panier : ajout produit, sélection dates, modification quantité, suppression", async ({
  page,
}) => {
  await page.goto(`${baseUrl}/produit/1`);

  //await page.getByRole("combobox").selectOption('{"id":1,"size":"150 cm"}');

  await page.getByRole("button", { name: "Ajouter au panier" }).click();

  await page.getByRole("link", { name: /Mon panier/ }).click();

  await page.goto(`${baseUrl}/panier`);

  // Vérifie que la textbox du calendrier est visible avant de cliquer
  const dateTextbox = page.getByPlaceholder("Choisir une date");
  await expect(dateTextbox).toBeVisible();
  await dateTextbox.click();

  await page.getByRole("option", { name: date16 }).click();
  await page.getByRole("option", { name: date19 }).click();

  await page.getByRole("button", { name: "Valider les dates" }).click();

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
  await expect(page.getByText("Mon panier (0)")).toBeVisible();
});
