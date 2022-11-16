import Database from '../db/db';

class Token extends Database {
  constructor() {
    super('tokens');
  }

  async getTokenByUser(id) {
    return await this.first('user_id', '=', id);
  }

  async getToken(token) {
    return await this.first('token', '=', token);
  }
}

export default Course;
