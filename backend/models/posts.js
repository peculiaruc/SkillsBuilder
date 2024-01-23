import Database from '../db/db';

class Post extends Database {
  constructor() {
    super('posts');
  }

  async getByGroup(id) {
    return await this.first('group_id', '=', id);
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async all() {
    return super.all();
  }
}

export default Post;
