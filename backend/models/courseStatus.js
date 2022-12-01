import Database from '../db/db';

class CourseStatus extends Database {
  constructor() {
    super('course_status');
  }

  async getAll() {
    return super.all();
  }
}

export default CourseStatus;
