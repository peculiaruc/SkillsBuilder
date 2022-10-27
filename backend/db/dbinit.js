/* eslint-disable no-console */
import dbInterface from './db';
import { users } from '../models/users';

export default async () => {
  try {
    // check db for response
    const date = await dbInterface.query('SELECT NOW()');
    console.log('date', date)
    // create tables
    await dbInterface.query(users);

    if (process.env.NODE_ENV !== 'production') {
      console.log('Database connected with tables');
    }
    console.log('Database connected with tables');
    return true;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error.message);
    }
    return false;
  }
};
