import db from '../db/db';
import sendEmail from '../utils/sendEmails';

module.exports = {
  getAllCourses: async (req, res) => {
    const { offset, limit } = req.query;
    try {
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
  },

  getCoursesByCategories: async (req, res) => {
    const { categories } = req.body;
    try {
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
  },

  getCoursesById: async (req, res) => {
    const { id } = req.params;
    try {
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
  },

  getEnrolledCourses: async (req, res) => {
    const { user_id } = req.body;
    try {
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
  },

  getCourseCategory: async (req, res) => {
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
  },

  enrollUser: async (req, res) => {
    const { user_id, course_id, course_name } = req.body;
    try {
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
  },
};

