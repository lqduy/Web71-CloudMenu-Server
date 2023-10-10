import { MongoClient } from 'mongodb';

const DATABASE = 'web71-cloud-menu';

const db = {};

const connectToDatabase = async () => {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();

    console.log('Database connected successfully');
    const database = mongoClient.db(DATABASE);

    // Collections
    db.users = database.collection('users');
    db.pages = database.collection('pages');
    db.dishes = database.collection('dishes');
    db.menus = database.collection('menus');
  } catch (error) {
    console.error('Connect to DB failed:', error);
    process.exit(1);
  }
};

export { connectToDatabase, db };
