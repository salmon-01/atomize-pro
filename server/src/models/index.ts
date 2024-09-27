import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const database = `${process.env.PSQL_DATABASE}`;
const username = `${process.env.PSQL_USER}`;
const password = `${process.env.PASSWORD}`;

export const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});
