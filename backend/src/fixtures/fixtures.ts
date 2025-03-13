import { fakerFR as faker } from '@faker-js/faker';
import { dataSource } from "../config/db";
import * as argon2 from "argon2";
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { normalizeString } from "../assets/utils";
import { Address } from '../entities/Address';

async function createFixtures() {
    try {
        await dataSource.initialize();
        console.log("📡 Database connected!");

        // Supprime la base de données avant d'importer les fixtures
        await dataSource.dropDatabase();
        // Il faut resynchro la DB sinon on a une erreur pour créer les données
        await dataSource.synchronize();

        // Génère la même graine pour que le groupe travaille avec les mêmes données
        faker.seed(4);
        await createUsers();
        await createCategories();
        await createAddress();

        console.log("🎉 Fixtures created successfully!");
    } catch (error) {
        console.error("❌ Error while creating fixtures:", error);
    } finally {
        await dataSource.destroy();
        console.log("🔌 Database connection closed.");
    }
}

async function createUsers() {
    try {
        const users = [];

        // Génère un nombre aléatoire pour le numéro de téléphone
        function getRandomSixDigit() {
            return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        }

        // Création d'un utilisateur par défaut
        users.push({
            first_name: 'Jon',
            role: 'ADMIN',
            last_name: 'Snow',
            email: 'jonsnow@wild-rent.com',
            hashed_password: await argon2.hash('password'),
            phone_number: '+33636656565',
            created_at: new Date()
        });

        for (let i = 0; i < 30; i++) {
            let randomSixDigit = getRandomSixDigit();

            const first_name = faker.person.firstName();
            const last_name = faker.person.lastName();
            const full_name = first_name + last_name;
            const phone_number = '+336' + randomSixDigit;
            const email = `${normalizeString(full_name)}@wild-rent.com`;
            const hashed_password = await argon2.hash('password');
            const created_at = new Date();
            const addressId = i;

            users.push({
                first_name,
                last_name,
                email,
                phone_number,
                hashed_password,
                created_at,
                addressId
            });
        }

        await User.save(users);
        console.log("✅ Users created successfully!");
    } catch (error) {
        console.error("❌ Error while creating users:", error);
    }
}

async function createAddress() {
    try {
        const addresses = [];

        for (let i = 0; i < 31; i++) {
            const street = faker.number.int({ min: 2, max: 50 }) + ' ' + faker.location.street();
            const city = faker.location.city();
            const country = 'France';
            const zipcode = faker.location.zipCode();

            addresses.push({
                street,
                city,
                country,
                zipcode,
            });
        }

        await Address.save(addresses);
        console.log("✅ Addresses created successfully!");
    } catch (error) {
        console.error("❌ Error while creating addresses:", error);
    }
async function createCategories() {
    try {
        const categoryTitles = [
            'Sport d\'hiver',
            'Sport nautique',
            'VTT / Vélo',
            'Randonnée',
            'Camping'
        ];

        const categoryImages = [
            'muntain.jpeg',
            'watersport.webp',
            'bike.jpeg',
            'hiking.jpeg',
            'camping.avif'
        ];

        const categories = categoryTitles.map((title, index) => {
            const category = new Category();
            category.title = title;
            category.image = categoryImages[index];
            return category;
        });

        await Category.save(categories);
        console.log("✅ Categories created successfully!");
    } catch (error) {
        console.error("❌ Error while creating categories:", error);
    }
}

createFixtures();
