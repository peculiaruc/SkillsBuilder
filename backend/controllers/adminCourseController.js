import db from '../db/db';
import sendEmail from '../utils/sendEmails';

exports.createCourse = async (req, res) => {
  try {
    const { name, description, thumbnail, summary, category } = req.body;
    const newCourse = await db.query(
      'INSERT INTO courses(name, description, thumbnail, summary, category_ids) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [name, description, thumbnail, summary, { ...category }]
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
};

exports.addCourseLesson = async (req, res) => {
  try {
    const { course_id, description, lesson_no, lesson_content, lesson_content_type } = req.body;
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
};

exports.deleteCourse = async (req, res) => {
  try {
    const { course_id } = req.body;
    // delete course
    await db.query('DELETE FROM courses WHERE course_id = $1', [course_id]);
    // delete course lessons
    await db.query('DELETE FROM course_lesson WHERE course_id = $1', [course_id]);
    // delete course assignments
    await db.query('DELETE FROM assignments WHERE course_id = $1', [course_id]);
    // delete course assignment submisions
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
};

exports.deleteCourseLesson = async (req, res) => {
  try {
    const { course_id } = req.body;
    // delete course lessons
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
};

exports.deleteCourseAssignment = async (req, res) => {
  try {
    const { assignment_id } = req.body;
    // delete
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
};

exports.deleteCourseAssignmentSubmission = async (req, res) => {
  try {
    const { submission_id } = req.body;

    //delete
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
};
