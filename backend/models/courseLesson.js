import Database from '../db/db';

class CourseLesson extends Database {
  constructor() {
    super('courses_lesson');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async all(limit, offset) {
    return super.allWithOffset(limit, offset);
  }
}

export default CourseLesson;
