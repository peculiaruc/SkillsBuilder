import db from '../db/db';
import sendEmail from '../utils/sendEmails';

exports.getAllCourses = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const total = await db.query('SELECT COUNT(*) FROM courses');
    const course_data = await db.query('SELECT * FROM courses LIMIT $2 OFFSET $1', [
      offset || 0,
      limit || 5,
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        totalCourses: total.rows[0].count,
        courses: course_data.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.getCoursesByCategories = async (req, res) => {
  try {
    const { categories } = req.body;
    const course_data = await db.query('SELECT * FROM  courses WHERE category_ids @> $1', [
      categories,
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        totalCourses: course_data.rowCount,
        courses: course_data.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.getCoursesById = async (req, res) => {
  try {
    const { id } = req.params;
    const course_data = await db.query('SELECT * FROM  courses WHERE id = $1', [id]);

    return res.status(200).json({
      status: 'success',
      data: {
        course: course_data.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { user_id } = req.body;
    const enrolled_courses = await db.query('SELECT * FROM enrollments WHERE user_id = $1', [
      user_id,
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        totalCourses: enrolled_courses.rowCount,
        courses: enrolled_courses.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.getCourseCategory = async (req, res) => {
  try {
    const categories_data = await db.query('SELECT * FROM course_categories');
    return res.status(200).json({
      status: 'success',
      data: {
        categories: categories_data.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.enrollUser = async (req, res) => {
  try {
    const { user_id, course_id, course_name } = req.body;
    const user = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);
    await db.query(
      'INSERT INTO enrollments(user_id, course_id, enroll_date) VALUES($1, $2, $3) RETURNING *',
      [user_id, course_id, new Date()]
    );
    await sendEmail(
      user.rows[0].email,
      'Enrollment Confirmation',
      `You have successfully enrolled in ${course_name}`
    );
    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.getCourseAssignments = async (req, res) => {
  try {
    const { course_id } = req.body;
    const assignments = await db.query('SELECT * FROM assignments WHERE course_id = $1', [
      course_id,
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        assignments: assignments.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.getAssignmentSubmissions = async (req, res) => {
  try {
    const { course_id, user_id } = req.body;
    const assignments = await db.query(
      'SELECT * FROM assignment_submission WHERE course_id = $1 AND user_id = $2',
      [course_id, user_id]
    );

    return res.status(200).json({
      status: 'success',
      data: {
        assignments: assignments.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};

exports.createAssignmentSubmissions = async (req, res) => {
  try {
    const { course_id, user_id, assignment_id, grade, ass_status } = req.body;
    const newSubmission = await db.query(
      'INSERT INTO assignment_submission(course_id, user_id, assignment_id, grade, status) VALUES($1, $2, $3, $4) RETURNING *',
      [course_id, user_id, assignment_id, grade, ass_status]
    );

    return res.status(200).json({
      status: 'success',
      data: {
        assignments: newSubmission.rows,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      error: err.message,
    });
  }
};
