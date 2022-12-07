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

  async activeGroups() {
    return super.allWhere({ status: 'active' });
  }
}

export default Group;
