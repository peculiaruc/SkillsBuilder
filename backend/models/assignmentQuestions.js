import Database from '../db/db';

class AssignmentQuestions extends Database {
  constructor() {
    super('assignment_questions');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByAssignment(id) {
    return await this.where('assignment_id', '=', id);
  }

  async all(orderBy = 'created_at DESC') {
    return super.all(orderBy);
  }
}

export default AssignmentQuestions;
