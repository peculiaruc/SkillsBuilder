import db from './db';
import {
  users,
  tokens,
  courseCategories,
  courses,
  enrollments,
  courseLesson,
  assignmentSubmission,
  assignments,
} from '../models';

export default async () => {
  let date;
  try {
    date = await db.query('SELECT NOW()');
    if (process.env !== 'production') {
      console.log('Database connected', date.rows[0]);
    }
    await db.query(users);
    await db.query(tokens);
    await db.query(courseCategories);
    await db.query(courses);
    await db.query(enrollments);
    await db.query(courseLesson);
    await db.query(assignmentSubmission);
    await db.query(assignments);
    return true;
  } catch (e) {
    console.log('db init err', e);
  }
};
