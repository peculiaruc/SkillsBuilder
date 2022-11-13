import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DEV_DATABASE_URL,
});

export default {
  query: async (text, params) => {
    try {
      const res = await pool.query(text, params);
      return res;
    } catch (e) {
      console.log(e);
    }
  },
  clearDb: async () => {
    await pool.query('DROP TABLE IF EXISTS ffff CASCADE');
  },
};