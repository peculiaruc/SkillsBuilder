import { users } from './create_users_table';
import { tokens } from './create_tokens_table';
import { courseCategories } from './create_categories_table';
import { enrollments } from './create_enrollments_table';
import { courses } from './create_courses_table';
import { courseLesson } from './create_course_lessons_table';
import { assignments } from './create_assignments_table';
import { assignmentSubmission } from './create_assignments_submissions_table';
import { assignmentQuestions } from './create_assignment_questions_table';
import { makePassNullable } from './make_password_optional';

export {
  users,
  tokens,
  courseCategories,
  enrollments,
  courses,
  courseLesson,
  assignments,
  assignmentSubmission,
  assignmentQuestions,
  makePassNullable,
};