import Database from '../db/db';

class Enrollment extends Database {
  constructor() {
    super('enrollments');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByCourse(id) {
    return await this.where('course_id', '=', id);
  }

  async getByUser(userId) {
    return await this.where('user_id', '=', userId);
  }

  async all() {
    return super.all();
  }
}

export default Enrollment;
