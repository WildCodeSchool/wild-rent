import { fakerFR as faker } from '@faker-js/faker';
import { dataSource } from "../config/db";
import * as argon2 from "argon2";
import { User } from '../entities/User';

async function createUsers() {
    await dataSource.initialize();

    const users = [];

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
            hashed_password,
            phone_number,
            created_at
        });
    }

    await User.save(users);
}

createUsers();