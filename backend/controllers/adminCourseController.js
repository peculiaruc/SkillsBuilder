import db from '../db/db';

module.exports = {
  createCourse: async (req, res) => {
    const { name, description, thumbnail, summary, category } = req.body;
    try {
      const newCourse = await db.query(
        'INSERT INTO courses(name, description, thumbnail, summary, category_ids) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [name, description, thumbnail, summary, category]
      );
      return res.status(200).json({
        status: 'success',
        data: {
          course: newCourse.rows[0],
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

  addCourseLesson: async (req, res) => {
    const { course_id, description, lesson_no, lesson_content, lesson_content_type } = req.body;
    try {
      const newCourseLesson = await db.query(
        'INSERT INTO course_lesson(course_id, description, lesson_no, lesson_content, lesson_content_type) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [course_id, description, lesson_no, lesson_content, lesson_content_type]
      );
      return res.status(200).json({
        status: 'success',
        data: {
          course: newCourseLesson.rows[0],
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

  deleteCourse: async (req, res) => {
    const { course_id } = req.body;
    try {
      await db.query('DELETE FROM courses WHERE course_id = $1', [course_id]);
      await db.query('DELETE FROM course_lesson WHERE course_id = $1', [course_id]);
      await db.query('DELETE FROM assignments WHERE course_id = $1', [course_id]);
      await db.query('DELETE FROM assignment_submission WHERE course_id = $1', [course_id]);

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

  deleteCourseLesson: async (req, res) => {
    const { course_id } = req.body;
    try {
      await db.query('DELETE FROM course_lesson WHERE course_id = $1', [course_id]);

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

  deleteCourseAssignment: async (req, res) => {
    const { assignment_id } = req.body;
    try {
      await db.query('DELETE FROM assignments WHERE id = $1', [assignment_id]);
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

  deleteCourseAssignmentSubmission: async (req, res) => {
    const { submission_id } = req.body;
    try {
      await db.query('DELETE FROM assignment_submission WHERE id = $1', [submission_id]);

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
