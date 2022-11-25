import Database from '../db/db';

class User extends Database {
  constructor() {
    super('users');
  }

  async getByEmail(email) {
    return await this.first('email', '=', email);
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async all(limit, offset) {
    return super.allWithOffset(limit, offset);
  }
}

export default User;
