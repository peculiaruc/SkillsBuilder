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
    const { courseId, description, lessonNo, lessonContent, lessonContentType } = req.body;
    try {
      const newCourseLesson = await db.query(
        'INSERT INTO course_lesson(course_id, description, lesson_no, lesson_content, lesson_content_type) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [courseId, description, lessonNo, lessonContent, lessonContentType]
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
    const { courseId } = req.body;
    try {
      await db.query('DELETE FROM courses WHERE course_id = $1', [courseId]);
      await db.query('DELETE FROM course_lesson WHERE course_id = $1', [courseId]);
      await db.query('DELETE FROM assignments WHERE course_id = $1', [courseId]);
      await db.query('DELETE FROM assignment_submission WHERE course_id = $1', [courseId]);

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
    const { courseId } = req.body;
    try {
      await db.query('DELETE FROM course_lesson WHERE course_id = $1', [courseId]);

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
    const { assignmentId } = req.body;
    try {
      await db.query('DELETE FROM assignments WHERE id = $1', [assignmentId]);
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
    const { submissionId } = req.body;
    try {
      await db.query('DELETE FROM assignment_submission WHERE id = $1', [submissionId]);

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
