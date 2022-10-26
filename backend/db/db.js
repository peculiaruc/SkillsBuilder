import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.NODE_ENV === 'test' ? process.env.TESTDATABASE : process.env.DATABASE;

module.exports = knex({
  client: 'postgres',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database,
  },
});
