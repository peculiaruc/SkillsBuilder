import Database from '../db/db';

class LessonContent extends Database {
  constructor() {
    super('lesson_content');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByLesson(id) {
    return await this.first('lesson_id', '=', id);
  }

  async all(limit, offset) {
    return super.allWithOffset(limit, offset);
  }
}

export default LessonContent;
