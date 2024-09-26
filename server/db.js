const { Client } = require('pg');

require("dotenv").config();

const client = new Client({
  user: process.env.PSQL_USER,
  host: 'localhost',
  database: process.env.PSQL_DATABASE,
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to the database ⚡⚡⚡'))
  .catch(err => console.error('🚫 Database connection error:', err.stack));

module.exports = client;

// NOTE: Complete. Just need to create database.