import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:7000/login");

  await page
    .getByRole("textbox", { name: "Email" })
    .fill("laeptitchat29@gmail.com");

  await page.getByRole("textbox", { name: "Mot de passe" }).fill("test");

  await page.getByRole("button", { name: "Se connecter" }).click();

  await expect(
    page.getByRole("link", { name: "user icon Mon compte" })
  ).toBeVisible();
});
