import Database from '../db/db';

class User extends Database {
  constructor() {
    super('employees');
  }

  async getByEmail(email) {
    return await this.first('email', '=', email);
  }
  async getById(id) {
    return await this.first('id', '=', id);
  }
}

export default User;
