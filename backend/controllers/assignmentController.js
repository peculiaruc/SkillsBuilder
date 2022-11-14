import db from '../db/db';
import sendEmail from '../utils/sendEmails';

exports.getCourseAssignments = async (req, res) => {
  const { course_id } = req.body;
  try {
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
  const { assignment_id, user_id } = req.body;
  try {
    const assignments = await db.query(
      'SELECT * FROM assignment_submission WHERE assignment_id = $1 AND user_id = $2',
      [assignment_id, user_id]
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
  const { course_id, user_id, assignment_id, grade, ass_status } = req.body;
  try {
    const newSubmission = await db.query(
      'INSERT INTO assignment_submission(course_id, user_id, assignment_id, grade, status) VALUES($1, $2, $3, $4, $5) RETURNING *',
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

exports.getAssignmentById = async (req, res) => {
  const { assignment_id } = req.body;
  try {
    const assignment = await db.query('SELECT * FROM assignments WHERE id = $1', [assignment_id]);

    return res.status(200).json({
      status: 'success',
      data: {
        assignments: assignment.rows,
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

exports.getAssignmentQuestions = async (req, res) => {
  const { assignment_id } = req.body;
  try {
    const quiz = await db.query(
      'SELECT * FROM assignment_questions WHERE assignment_id = $1 ORDER BY question_no ASC',
      [assignment_id]
    );

    return res.status(200).json({
      status: 'success',
      data: {
        questions: quiz.rows,
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

exports.createAssignmentQuestions = async (req, res) => {
  const { questions } = req.body;

  try {
    await questions.map(async (q) => {
      const { assignment_id, question, choices, answer, question_no } = q;
      await db.query(
        'INSERT INTO assignment_questions(assignment_id, question, choices, answer, question_no) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [assignment_id, question, choices, answer, question_no]
      );
    });

    const newSubmission = await db.query('SELECT * FROM assignments WHERE id = $1', [
      questions[0].assignment_id,
    ]);

    return res.status(200).json({
      status: 'success',
      data: {
        questions: newSubmission.rows,
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

exports.getUsersInMyCourse = async (req, res) => {
  const { course_id } = req.body;
  try {
    const users = await db.query('SELECT * FROM enrollments WHERE course_id = $1', [course_id]);
    return res.status(200).json({
      status: 'success',
      data: {
        users: users.rows,
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
