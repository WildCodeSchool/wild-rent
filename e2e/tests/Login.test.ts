// import { test, expect } from "@playwright/test";
// import "dotenv/config";

// const baseUrl = "http://localhost:7000/login";

// test("login", async ({ page }) => {
//   await page.goto(baseUrl);

//   await page
//     .getByRole("textbox", { name: "Email" })
//     .fill("anniecroteauc@gmail.com");

//   await page.getByRole("textbox", { name: "Mot de passe" }).fill("password");

//   await page.getByRole("button", { name: "Se connecter" }).click();

//   await expect(
//     page.getByRole("link", { name: "user icon Mon compte" })
//   ).toBeVisible();
// });