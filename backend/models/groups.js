import Database from '../db/db';

class Group extends Database {
  constructor() {
    super('groups');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByCourse(id) {
    return await this.first('id', '=', id);
  }

  async all(orderBy = 'created_at DESC') {
    return super.all(orderBy);
  }
}

export default Group;
