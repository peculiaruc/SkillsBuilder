import Database from '../db/db';

class JoinedGroup extends Database {
  constructor() {
    super('joined_groups');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByUser(id) {
    return await this.first('user_id', '=', id);
  }

  async getByGroup(id) {
    return await this.first('group_id', '=', id);
  }

  async all(orderBy = 'created_at DESC') {
    return super.all(orderBy);
  }
}

export default JoinedGroup;
