import { Pool } from 'pg';
import 'dotenv/config';

let pool;
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
} else {
  pool = new Pool({ connectionString: process.env.DEV_DATABASE_URL});
}

export default {
  query: async (text, params) => {
    try {
      const client = await pool.connect();
      console.log('reached')
      const res = await client.query(text, params);
      console.log('reached')
      return res;
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        error: err.message,
      });
    } finally {
      client.release();
    }
  },
  clearDb: async () => {
    try {
      const client = await pool.connect();
      await client.query('DROP TABLE IF EXISTS ffff CASCADE');
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 'error',
        error: err.message,
      });
    }
  },
};
