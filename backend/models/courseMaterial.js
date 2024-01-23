import Database from '../db/db';

class Material extends Database {
  constructor() {
    super('course_materials');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getAll() {
    return super.all();
  }

  async getByCourse(id) {
    return super.allWhere({ course_id: id });
  }
}

export default Material;
