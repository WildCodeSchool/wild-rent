import { test, expect } from "@playwright/test";
import axios from "axios";
import "dotenv/config";

const baseUrl = "http://localhost:7000/";

const API_KEY = process.env.TEST_MAIL_API_KEY;
const namespace = process.env.TEST_MAIL_NAMESPACE;

test('reset password', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByRole('link', { name: 'Connexion' }).click();
    await page.getByText('Mot de passe oublié ?').click();
    await page.getByRole('textbox', { name: 'Entrez votre adresse email' }).click();
    await page.getByRole('textbox', { name: 'Entrez votre adresse email' }).fill(`${namespace}.test@inbox.testmail.app`);
    await page.getByRole('button', { name: 'Envoyer le lien de ré' }).click();
    await expect(page.getByText('Un email de réinitialisation')).toBeVisible();

    let link = "";
    const res = await axios.get("https://api.testmail.app/api/json", {
        params: {
            apikey: API_KEY,
            namespace: namespace,
            livequery: "true",
            timestamp_from: Date.now(),
        },
    });

    // Permet de retrouver l'URL de confirmation dans la réponse de l'objet
    if (res.data.emails && res.data.emails[0].subject === 'Réinitialisation de votre mot de passe') {
        const email = res.data.emails[0];
        const match = email.text.match(/http:\/\/[^\s]+/g);
        link = match[0];
    } else {
        const email = res.data.emails[0];
        const match = email.text.match(/http:\/\/[^\s]+/g);
        link = match[0];
    }

    await page.goto(link);
    await page.locator('input[name="new_password"]').click();
    await page.locator('input[name="new_password"]').fill("password123");
    await page.locator('input[name="password_confirmation"]').click();
    await page.locator('input[name="password_confirmation"]').fill("password123");
    await page.getByRole('button', { name: 'Valider' }).click();
    await expect(page.getByText('Nouveau mot de passe créé')).toBeVisible();
});