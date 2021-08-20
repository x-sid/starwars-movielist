require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorage: "json",
    migrationStoragePath: "sequelize-meta.json",
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASS,
    database: process.env.TEST_NAME,
    host: process.env.TEST_HOST,
    dialect: "postgres",
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
};
