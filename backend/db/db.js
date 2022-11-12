import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

<<<<<<< HEAD
const pool = new Pool();

export default {
  query: async (text, params) => {
    // try {
    const res = await pool.query(text, params);
    return res;
    // } catch (e) {
    //   console.log(e);
    // }
=======
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
>>>>>>> c563641dd4279d57dd3e9bf4f84bc9daa311a044
  },
  clearDb: async () => {
    await pool.query('DROP TABLE IF EXISTS ffff CASCADE');
  },
};