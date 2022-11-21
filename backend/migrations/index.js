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
import { addType } from './add_column_questions_table';
import { addColumns } from './add_column_assignments_table';
import { addTypeC } from './add_type_column_tokens_table';

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
  addType,
  addColumns,
  addTypeC,
};
