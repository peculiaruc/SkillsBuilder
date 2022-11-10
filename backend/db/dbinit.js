import db from './db';
import { users, tokens, course_categories, courses, enrollments } from '../models';

export default async () => {
  try {
    const date = await db.query('SELECT NOW()');
    if (process.env !== 'production') {
      console.log('Database connected', date.rows[0]);
    }
    await db.query(users);
    await db.query(tokens);
    await db.query(course_categories);
    await db.query(courses);
    await db.query(enrollments);
    return true;
  } catch (e) {
    console.log('db init err', e);
  }
};
