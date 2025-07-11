// import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:7000";

// function formatDate(day: number): string {
//   const today = new Date();
//   const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), day));
//   const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
//   const month = date.toLocaleDateString("en-US", { month: "long" });
//   const label = `Choose ${weekday}, ${month} ${day}th,`;
//   return label;
// }
// const date16 = formatDate(16);
// const date19 = formatDate(19);
// const date28 = formatDate(28);

// test("test", async ({ page }) => {
//   await page.goto(baseUrl + "/produit/1");
//   await page.getByRole("button", { name: "Ajouter au panier" }).click();
//   await page.getByRole("link", { name: "cart Mon panier (1)" }).click();
//   await page.goto(baseUrl + "/panier");
//   await page
//     .locator("div")
//     .filter({ hasText: /^Vos dates de location :Valider les dates$/ })
//     .getByRole("textbox")
//     .click();
//   await page.getByRole("option", { name: date16 }).click();
//   await page.getByRole("option", { name: date19 }).click();
//   await page.getByRole("button", { name: "Valider les dates" }).click();
//   await page
//     .locator("div")
//     .filter({ hasText: /^45€$/ })
//     .getByRole("paragraph")
//     .click();
//   await page.getByRole("button", { name: "+" }).click();
//   await page.getByText("2", { exact: true }).click();
//   await page
//     .locator("div")
//     .filter({ hasText: /^90€$/ })
//     .getByRole("paragraph")
//     .click();
//   await page.getByRole("button", { name: "-" }).click();
//   await page.getByText("1", { exact: true }).click();
//   await page.getByRole("button", { name: "corbeille" }).click();
//   await expect(page.getByText("Mon panier (0)")).toBeVisible();
// });
