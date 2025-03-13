import { fakerFR as faker } from '@faker-js/faker';
import { dataSource } from "../config/db";
import * as argon2 from "argon2";
import { User } from '../entities/User';


async function createUsers() {
    await dataSource.initialize();
    console.log("📡 Database connected!");
    const users = [];
    
    // Création d'un utilisateur par défaut
    users.push(({
        first_name: 'Jon',
        last_name: 'Snow',
        email: 'jonsnow@wild-rent.com',
        hashed_password: await argon2.hash('password'),
        phone_number: '0606060606',
        created_at: new Date()
    }));

    for (let i = 0; i < 5; i++) {
        const first_name = faker.person.firstName();
        const last_name = faker.person.lastName();
        const phone_number = faker.phone.number();
        const email = `${first_name.toLowerCase()}.${last_name.toLowerCase()}@gmail.com`;
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
}

async function createCategories() {
    const categories = [];

    for (let i = 0; i < 5; i++) {
        categories.push({

        })
    }
}

createUsers();