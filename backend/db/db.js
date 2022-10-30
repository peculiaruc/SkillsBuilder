import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool();

export default {
  query: async (text, params) => {
    // try {
    const res = await pool.query(text, params);
    return res;
    // } catch (e) {
    //   console.log(e);
    // }
  },
  clearDb: async () => {
    await pool.query('DROP TABLE IF EXISTS ffff CASCADE');
  },
};
