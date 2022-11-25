import Database from './db';
import {
  users,
  tokens,
  courseCategories,
  courses,
  enrollments,
  courseLesson,
  assignmentSubmission,
  assignments,
  assignmentQuestions,
  makePassNullable,
  addType,
  addColumns,
  joinedGroups,
  groups,
  choiceType,
} from '../migrations';

export default async () => {
  let date;
  let db = new Database();
  try {
    date = await db.queryBuilder('SELECT NOW()');
    if (process.env !== 'production') {
      console.log('Database connected', date.rows[0]);
    }
    await db.queryBuilder(users);
    await db.queryBuilder(tokens);
    await db.queryBuilder(courseCategories);
    await db.queryBuilder(courses);
    await db.queryBuilder(enrollments);
    await db.queryBuilder(courseLesson);
    await db.queryBuilder(assignmentSubmission);
    await db.queryBuilder(assignments);
    await db.queryBuilder(assignmentQuestions);
    await db.queryBuilder(makePassNullable);
    await db.queryBuilder(addType);
    await db.queryBuilder(addColumns);
    await db.queryBuilder(groups);
    await db.queryBuilder(joinedGroups);
    await db.queryBuilder(choiceType);
    return true;
  } catch (e) {
    console.log('db init err', e);
  }
};
