import Database from '../db/db';

class Assignment extends Database {
  constructor() {
    super('assignments');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByAuthor(id) {
    return await this.where('author_id', '=', id);
  }

  async getByCourse(id) {
    return await this.where('course_id', '=', id);
  }

  async all(orderBy = 'created_at DESC') {
    return super.all(orderBy);
  }
}

export default Assignment;
