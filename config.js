require("dotenv").config();
const pg = require("pg");
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: [process.env.DB_HOST],
    dialect: "postgres",
    dialectModule: pg,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: [process.env.DB_HOST],
    dialect: "postgres",
    dialectModule: pg,
  },
  production: {
    username: "fms_9xez_user",
    password: "acaI3DV3SpzJW0cmOpoCoZyzILkyQzpk",
    database: process.env.DB_NAME,
    host: ["dpg-ckrv4m10at9c73buhhd0-a"],
    dialect: "postgres",
    dialectModule: pg,
  },
};
