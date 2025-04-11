import { test, expect } from "@playwright/test";
function formatDate(day: number): string {
  const today = new Date();
  const date = new Date(Date.UTC(today.getFullYear(), today.getMonth(), day));
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const label = `Choose ${weekday}, ${month} ${day}th,`;
  return label;
}
const date13 = formatDate(13);
const date14 = formatDate(14);
const date28 = formatDate(28);
test("test click article and select dates", async ({ page }) => {
  await page.goto("http://localhost:7000/produit/1");
  await page.getByRole("textbox", { name: "Début" }).click();
  await page.getByRole("option", { name: date13 }).click();
  await page.getByRole("textbox", { name: "Fin" }).click();
  await page.getByRole("option", { name: date14 }).click();
  await expect(page.getByText("Total: 15€")).toHaveText("Total: 15€");
  await page.getByRole("textbox", { name: "Début" }).click();
  await page.getByRole("textbox", { name: "Fin" }).click();
  await page.getByRole("option", { name: date28 }).click();
  await expect(page.getByText("Total: 225€")).toHaveText("Total: 225€");
});
