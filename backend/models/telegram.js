import Database from '../db/db';

class TelegramuUsers extends Database {
  constructor() {
    super('telegram_users');
  }

  async getAll() {
    return super.all();
  }
}

export default TelegramuUsers;
