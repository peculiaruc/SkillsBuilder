import Database from '../db/db';

class Course extends Database {
  constructor() {
    super('courses');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByAuthor(id) {
    return await this.where('author_id', '=', id);
  }

  async getByCategory(categories) {
    return await this.where('category_ids', '@>', categories);
  }

  async all(limit, offset, orderBy, condition) {
    return super.allWithOffset(limit, offset, orderBy);
  }
}

export default Course;
