import { fakerFR as faker } from '@faker-js/faker';
import { dataSource } from "../config/db";
import * as argon2 from "argon2";
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { normalizeString } from "../assets/utils";
import { Product } from '../entities/Product';
import { Address } from '../entities/Address';
// import { Picture } from '../entities/Picture';

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
        await createAddresses();
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

        // Il faut faire cette vérification, sinon on a une erreur lorsque qu'on veut utiliser User.save(users) 
        // -> 'Address | null' is not assignable to type 'DeepPartial<Address> | undefined'
        // Cela est dû au fait qu'on tente (potentiellement) de passer un objet undefined à TypeORM
        if (!defaultAddress) {
            throw new Error('Default address not found');
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

        // On initie la valeur à 1 car on va assigner l'utilisateur Jon Snow à l'adresse qui à l'ID 1,
        // Chaque adresse est unique pour un utilisateur, donc si on tente d'en assigner une qui est déjà attribué on aura une erreur
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
                throw new Error(`No address found for ${full_name}`);
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

async function createAddresses() {
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

async function getCategoryByTitle(title: string) {
    const category = await Category.findOne({ where: { title } });
    if (!category) {
        throw new Error('Category does not exist');
    }
    return category;
}

async function createProducts() {
    try {
        const products = [];

        const categoriesData = [
            { title: 'Sport d\'hiver', name: 'Ski', count: 3, price: 25 },
            { title: 'Sport d\'hiver', name: 'Snowboard', count: 3, price: 30 },
            { title: 'Sport d\'hiver', name: 'Chaussures de ski', count: 1, price: 8 },
            { title: 'Sport d\'hiver', name: 'Chaussures de snow', count: 1, price: 8 },
            { title: 'Sport d\'hiver', name: 'Gants', count: 3, price: 5 },
            { title: 'Sport nautique', name: 'Planche de surf', count: 5, price: 40 },
            { title: 'Sport nautique', name: 'Bodyboard', count: 3, price: 15 },
            { title: 'Sport nautique', name: 'Bouée', count: 1, price: 8 },
            { title: 'VTT / Vélo', name: 'Vélo éléctrique', count: 2, price: 20 },
            { title: 'VTT / Vélo', name: 'VTT', count: 3, price: 35 },
            { title: 'VTT / Vélo', name: 'Casque', count: 2, price: 5 },
            { title: 'Randonnée', name: 'Chaussures', count: 3, price: 12 },
            { title: 'Randonnée', name: 'Bâtons', count: 2, price: 6 },
            { title: 'Randonnée', name: 'Sac à dos', count: 3, price: 8 },
            { title: 'Camping', name: 'Tente', count: 3, price: 25 },
            { title: 'Camping', name: 'Réchaud', count: 1, price: 10 },
            { title: 'Camping', name: 'Bouteille de gaz', count: 2, price: 4 }
        ];

        // Créer les produits pour chaque catégorie
        for (const { title, count, name, price } of categoriesData) {
            const category = await getCategoryByTitle(title);

            for (let i = 0; i < count; i++) {
                const description = faker.lorem.lines();
                const created_at = new Date();

                products.push({
                    name,
                    description,
                    price,
                    created_at,
                    category
                })
            }
        }

        await Product.save(products);
        console.log("✅ Products created successfully!");
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
