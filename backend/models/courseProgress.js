import Database from '../db/db';

class CourseProgress extends Database {
  constructor() {
    super('course_progress');
  }

  async getAll() {
    return super.all();
  }
}

export default CourseProgress;
