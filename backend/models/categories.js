import Database from '../db/db';

class Categories extends Database {
  constructor() {
    super('course_categories');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async all() {
    return super.all();
  }
}

export default Categories;
