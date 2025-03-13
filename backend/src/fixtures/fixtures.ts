import { fakerFR as faker } from '@faker-js/faker';
import { dataSource } from "../config/db";
import * as argon2 from "argon2";
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { normalizeString } from "../assets/utils";

async function createFixtures() {
    try {
        await dataSource.initialize();
        console.log("📡 Database connected!");

        // Supprime complètement la base de données
        await dataSource.dropDatabase();
        await dataSource.synchronize();

        // Génère la même graine pour que tout le monde travaille avec les mêmes données
        faker.seed(4);
        await createUsers();
        await createCategories();

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

        // Création d'un utilisateur par défaut
        users.push({
            first_name: 'Jon',
            role: 'ADMIN',
            last_name: 'Snow',
            email: 'jonsnow@wild-rent.com',
            hashed_password: await argon2.hash('password'),
            phone_number: '0606060606',
            created_at: new Date()
        });

        for (let i = 0; i < 5; i++) {
            const first_name = faker.person.firstName();
            const last_name = faker.person.lastName();
            const full_name = first_name + last_name;
            const phone_number = faker.phone.number();
            const email = `${normalizeString(full_name)}@wild-rent.com`;
            const hashed_password = await argon2.hash('password');
            const created_at = new Date();

            users.push({
                first_name,
                last_name,
                email,
                phone_number,
                hashed_password,
                created_at
            });
        }

        await User.save(users);
        console.log("✅ Users created successfully!");
    } catch (error) {
        console.error("❌ Error while creating users:", error);
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
            'muntain.jpg',
            'watersport.webp',
            'bike.png',
            'hiking.png',
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
