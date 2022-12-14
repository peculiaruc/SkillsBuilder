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
  joinedGroups,
  groups,
  choiceType,
  courseStatus,
  posts,
  courseMaterial,
  courseProgress,
  telegramUsers,
} from '../migrations';

export default async () => {
  let date;
  const db = new Database();
  try {
    date = await db.queryBuilder('SELECT NOW()');
    if (process.env.NODE_ENV !== 'production') {
      console.log(date);
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
    await db.queryBuilder(groups);
    await db.queryBuilder(joinedGroups);
    await db.queryBuilder(choiceType);
    await db.queryBuilder(courseStatus);
    await db.queryBuilder(posts);
    await db.queryBuilder(courseMaterial);
    await db.queryBuilder(courseProgress);
    await db.queryBuilder(telegramUsers);
    return true;
  } catch (e) {
    console.log('db init err', e);
  }
};
