import { fakerFR as faker } from "@faker-js/faker";
import { dataSource } from "../config/db";
import * as argon2 from "argon2";
import { User } from "../entities/User";
import { Category } from "../entities/Category";
import { normalizeString } from "../assets/utils";
import { Product } from '../entities/Product';
import { Address } from '../entities/Address';
import { Picture } from '../entities/Picture';

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
      throw new Error("Default address not found");
    }

    users.push({
      first_name: "Jon",
      role: "ADMIN",
      last_name: "Snow",
      email: "jonsnow@wild-rent.com",
      hashed_password: await argon2.hash("password"),
      phone_number: "+33636656565",
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
      const phone_number = "+336" + randomEightDigit;
      const email = `${normalizeString(full_name)}@wild-rent.com`;
      const hashed_password = await argon2.hash("password");
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
      const street =
        faker.number.int({ min: 2, max: 50 }) + " " + faker.location.street();
      const city = faker.location.city();
      const country = "France";
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
    throw new Error("Category does not exist");
  }
  return category;
}

async function createProducts() {
  try {
    const pictures: Picture[] = [];

    const productData = [
      { title: 'Sport d\'hiver', name: 'Ski blue', urls: ['products/winterSports/skiBlue1.webp', 'products/winterSports/skiBlue2.webp', 'products/winterSports/skiBlue3.webp'], price: 15 },
      { title: 'Sport d\'hiver', name: 'Ski pink', urls: ['products/winterSports/skiPink1.webp', 'products/winterSports/skiPink2.webp', 'products/winterSports/skiPink3.webp'], price: 20 },
      { title: 'Sport d\'hiver', name: 'Ski orange', urls: ['products/winterSports/skiOrange1.webp', 'products/winterSports/skiOrange1.webp'], price: 25 },
      { title: 'Sport d\'hiver', name: 'Snowboard Burton', urls: ['products/winterSports/snowboardBurton1.webp', 'products/winterSports/snowboardBurton2.webp' ,'products/winterSports/snowboardBurton4.webp'], price: 30 },
      { title: 'Sport d\'hiver', name: 'Snowboard Volcom', urls: ['products/winterSports/snowboardVolcom1.webp', 'products/winterSports/snowboardVolcom2.webp' ,'products/winterSports/snowboardVolcom3.webp'], price: 30 },
      { title: 'Sport d\'hiver', name: 'Chaussures de ski enfant ', urls: ['products/winterSports/skiShoesKid.webp'], price: 8 },
      { title: 'Sport d\'hiver', name: 'Chaussures de snow', urls: ['products/winterSports/snowShoes-1.webp'], price: 8 },
      { title: 'Sport d\'hiver', name: 'Gants noir', urls: ['products/winterSports/skiGloves-1.jpg'], price: 5 },
      { title: 'Sport d\'hiver', name: 'Gants camo', urls: ['products/winterSports/skiGloves-2.webp'], price: 7 },
      { title: 'Sport nautique', name: 'Planche de surf verte', urls: ['products/waterSports/surfboardGreen1.webp'], price: 25 },
      { title: 'Sport nautique', name: 'Planche de surf rose', urls: ['products/waterSports/surfboardPink1.webp', 'products/waterSports/surfboardPink2.webp'], price: 25 },
      { title: 'Sport nautique', name: 'Bodyboard', urls: ['products/waterSports/bodyboard.webp'], price: 15 },
      { title: 'Sport nautique', name: 'Palme', urls: ['products/waterSports/flippersBlack.webp'], price: 4 },
      { title: 'Sport nautique', name: 'Bouée', urls: ['products/waterSports/buoy1.jpg', 'products/waterSports/buoy2.jpg'], price: 3 },
      { title: 'Sport nautique', name: 'Paddle', urls: ['products/waterSports/paddlePink1.jpg', 'products/waterSports/paddlePink2.jpg', 'products/waterSports/paddlePink3.jpg'], price: 20 },
      { title: 'Sport nautique', name: 'Combinaison surf homme', urls: ['products/waterSports/surfSuitMengreen1.webp', 'products/waterSports/surfSuitMengreen2.webp'], price: 6 },
      { title: 'Sport nautique', name: 'Combinaison surf femme', urls: ['products/waterSports/surfSuitWomenMulti1.webp', 'products/waterSports/surfSuitWomenMulti2.webp'], price: 6 },
      { title: 'VTT / Vélo', name: 'Vélo éléctrique', urls: ['products/biking/electricVttWhite.jpg'], price: 40 },
      { title: 'VTT / Vélo', name: 'Vélo éléctrique', urls: ['products/biking/electricVttBlack.jpg'], price: 40 },
      { title: 'VTT / Vélo', name: 'VTT', urls: ['products/biking/menVttGrey1.jpg', 'products/biking/menVttGrey2.jpg'], price: 30 },
      { title: 'VTT / Vélo', name: 'Casque', urls: ['products/biking/helmet.avif'], price: 10 },
      { title: 'Randonnée', name: 'Chaussures randonnée Homme', urls: ['products/hiking/hikingBootsMenBrown1.webp', 'products/hiking/hikingBootsMenBrown2.webp', 'products/hiking/hikingBootsMenBrown3.webp'], price: 15 },
      { title: 'Randonnée', name: 'Chaussures randonnée Homme', urls: ['products/hiking/hikingBootsMenGreen1.jpg', 'products/hiking/hikingBootsMenGreen2.jpg', 'products/hiking/hikingBootsMenGreen3.jpg'], price: 12 },
      { title: 'Randonnée', name: 'Chaussures randonnée Femme', urls: ['products/hiking/hikingShoesWomen1.webp', 'products/hiking/hikingShoesWomen2.webp', 'products/hiking/hikingShoesWomen3.webp'], price: 12 },
      { title: 'Randonnée', name: 'Chaussures randonnée Femme', urls: ['products/hiking/hikingBootsWomenBeige1.webp', 'products/hiking/hikingBootsWomenBeige1.webp', 'products/hiking/hikingBootsWomenBeige1.webp'], price: 13 },
      { title: 'Randonnée', name: 'Bâtons noir', urls: ['products/hiking/hikingSticksBlack.webp'], price: 7 },
      { title: 'Randonnée', name: 'Bâtons bleu', urls: ['products/hiking/hikingSticksBlue.jpg'], price: 5 },
      { title: 'Randonnée', name: 'Bâtons multi', urls: ['products/hiking/hikingSticksMulti.jpg'], price: 6 },
      { title: 'Camping', name: 'Grand tente', urls: ['products/camping/tentBig.jpg'], price: 18 },
      { title: 'Camping', name: 'Tente 6 places', urls: ['products/camping/tent6p.avif'], price: 13 },
      { title: 'Camping', name: 'Tente', urls: ['products/camping/tentgreen.webp'], price: 12 },
      { title: 'Camping', name: 'Sac de couchage', urls: ['products/camping/simpleSleepingBag1.jpg'], price: 6 },
      { title: 'Camping', name: 'Sac de couchage', urls: ['products/camping/simpleSleepingBag2.jpg'], price: 6 },
      { title: 'Camping', name: 'Sac de couchage 2 places', urls: ['products/camping/sleepingBag2p1.jpg', 'products/camping/sleepingBag2p2.jpg'], price: 10 },
      { title: 'Camping', name: 'Chaise camping', urls: ['products/camping/campingChairBlue.jpg'], price: 3 },
      { title: 'Camping', name: 'Chaise camping', urls: ['products/camping/campingChairGreen1.jpg'], price: 2 },
    ];

    for (const { title, name, price, urls } of productData) {
      const category = await getCategoryByTitle(title);
      const description = faker.lorem.sentence();
      const created_at = new Date();

      // On utilise 'create' car on a besoin de créer une instance de produit AVANT de pouvoir lui associer les images
      // Précédemment on sauvegardait en DB la fin, mais, de ce cas précis nous avons besoin de créer le produit afin de pouvoir lui associer une image
      // Création d'une instance du produit sans le sauvegarder immédiatement
      const product = Product.create({
        name,
        description,
        price,
        created_at,
        category
      });

      // On sauvegarde les produits pour s'assurer que les images puissent être associés correctement
      await Product.save(product);

      // On est obligé de faire cette vérification sinon on a une erreur
      // -> error: null value in column "url" of relation "picture" violates not-null constraint
      // On boucle ici sur le tableau urls de chaque objet de ProductData et on les associe au produit courant
      if (urls) {
        urls.forEach(url => {
          const picture = Picture.create({
            url,
            product
          });
          pictures.push(picture);
        });
      }
    }

    // Sauvegarde en base de données de toutes les images après la boucle
    await Picture.save(pictures);
    console.log("✅ Products created successfully!");
  } catch (error) {
    console.error("❌ Error while creating products:", error);
  }
}

async function createCategories() {
  try {
    const categoryTitles = [
      "Sport d'hiver",
      "Sport nautique",
      "VTT / Vélo",
      "Randonnée",
      "Camping",
    ];

    const categoryImages = [
      "mountain.jpeg",
      "watersport.webp",
      "biking.jpeg",
      "hiking.jpeg",
      "camping.avif",
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
