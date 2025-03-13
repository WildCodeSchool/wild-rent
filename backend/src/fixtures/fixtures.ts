import { fakerFR as faker } from '@faker-js/faker';
import { dataSource } from "../config/db";
import * as argon2 from "argon2";
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { normalizeString } from "../assets/utils";
import { Product } from '../entities/Product';
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
        await createAddress();
        await createUsers();
        await createCategories();
        await createProducts();

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
        function getRandomEightDigit() {
            return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
        }

        // Création d'un utilisateur par défaut
        const defaultAddress = await Address.findOne({ where: { id: 1 } });

        if (!defaultAddress) {
            throw new Error('Adresse par défaut non trouvée');
        }
        users.push({
            first_name: 'Jon',
            role: 'ADMIN',
            last_name: 'Snow',
            email: 'jonsnow@wild-rent.com',
            hashed_password: await argon2.hash('password'),
            phone_number: '+33636656565',
            created_at: new Date(),
            address: defaultAddress,
        });

        for (let i = 1; i < 31; i++) {
            let randomEightDigit = getRandomEightDigit();

            const first_name = faker.person.firstName();
            const last_name = faker.person.lastName();
            const full_name = first_name + last_name;
            const phone_number = '+336' + randomEightDigit;
            const email = `${normalizeString(full_name)}@wild-rent.com`;
            const hashed_password = await argon2.hash('password');
            const created_at = new Date();
            const userAddress = await Address.findOne({ where: { id: i + 1 } });

            if (!userAddress) {
                throw new Error(`Adresse manquante pour l'utilisateur ${full_name}`);
            }

            users.push({
                first_name,
                last_name,
                email,
                phone_number,
                hashed_password,
                created_at,
                address: userAddress,
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
}

async function createProducts() {
    try {
        const products = [];

        // Produits lié à la catégorie sport d'hiver
        for (let i = 0; i < 10; i++) {
            const name = 'test';
            const price = faker.number.int({ min: 15, max: 50 });
            const description = faker.lorem.lines();
            const created_at = new Date();

            products.push({
                name,
                description,
                price,
                created_at,
            })
        }
        // Produits lié à la catégorie sport nautique
        for (let i = 0; i < 10; i++) {
            const name = 'test';
            const price = faker.number.int({ min: 10, max: 40 });
            const description = faker.lorem.lines();
            const created_at = new Date();

            products.push({
                name,
                description,
                price,
                created_at,
            })
        }
        // Produits lié à la catégorie VTT / Vélo
        for (let i = 0; i < 10; i++) {
            const name = 'test';
            const price = faker.number.int({ min: 10, max: 35 });
            const description = faker.lorem.lines();
            const created_at = new Date();

            products.push({
                name,
                description,
                price,
                created_at,
            })
        }
        // Produits lié à la catégorie randonnée
        for (let i = 0; i < 10; i++) {
            const name = 'test';
            const price = faker.number.int({ min: 5, max: 30 });
            const description = faker.lorem.lines();
            const created_at = new Date();

            products.push({
                name,
                description,
                price,
                created_at,
            })
        }
        // Produits lié à la catégorie camping
        for (let i = 0; i < 10; i++) {
            const name = 'test';
            const price = faker.number.int({ min: 5, max: 25 });
            const description = faker.lorem.lines();
            const created_at = new Date();

            products.push({
                name,
                description,
                price,
                created_at,
            })
        }

        await Product.save(products);
        console.log("✅ Categories created successfully!");
    } catch (error) {
        console.error("❌ Error while creating products:", error);
    }
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
