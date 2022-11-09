import db from './db';
import { users } from '../models/users';
import { tokens } from '../models/token';

export default async () => {
<<<<<<< HEAD
  // try {
  const date = await db.query('SELECT NOW()');
  if (process.env !== 'production') {
    console.log('Database connected', date.rows[0]);
=======
  try {
    const date = await db.query('SELECT NOW()');
    if (process.env !== 'production') {
      console.log('Database connected', date.rows[0]);
    }
    await db.query(users);
    await db.query(tokens);
    return true;
  } catch (e) {
    console.log('db init err', e);
>>>>>>> c563641dd4279d57dd3e9bf4f84bc9daa311a044
  }
  await db.query(users);
  return true;
  // } catch (e) {
  //   console.log('db init err', e);
  // }
};
