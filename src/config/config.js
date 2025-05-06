import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    logging: true,
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE, 
    host: process.env.DB_HOST_NAME,
    dialect: "postgres",
  },
  production: {
    // Use connection string for cloud database in production
    url: process.env.DATABASE_URL, // Add DATABASE_URL to your .env file
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for some cloud providers
      }
    }
  },
};

export default config;
