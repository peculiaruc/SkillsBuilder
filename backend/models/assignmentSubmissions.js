import Database from '../db/db';

class AssignmentSubmissions extends Database {
  constructor() {
    super('assignment_submission');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByUser(id) {
    return await this.where('user_id', '=', id);
  }

  async getByCourse(id) {
    return await this.where('course_id', '=', id);
  }

  async all(orderBy = 'created_at DESC') {
    return super.all(orderBy);
  }
}

export default AssignmentSubmissions;
