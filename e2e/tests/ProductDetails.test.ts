import { test, expect } from "@playwright/test";

test("test click article and add cart", async ({ page }) => {
  await page.goto("http://localhost:7000/produit/1");
  await page.getByText("15€ / jour");
  await page
    .getByRole("combobox")
    .selectOption('{"id":1,"size":"150 cm","total_quantity":10}');
  await page.getByRole("button", { name: "Ajouter au panier" }).click();
  await expect(page.getByText("Mon panier (1)")).toBeVisible();
  await page.getByRole("button", { name: "Ajouter au panier" }).click();
  await expect(page.getByText("Mon panier (2)")).toBeVisible();
});
