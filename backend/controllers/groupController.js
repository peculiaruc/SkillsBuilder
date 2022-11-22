import Helpers from '../helpers/helpers';
import Group from '../models/groups';
import JoinedGroup from '../models/joinedGroups';

const group = new Group();
const joinedG = new JoinedGroup();

class GroupController {
  // create group
  static async createGroup(req, res) {
    const { name, userId, courseId } = req.body;
    const newGroup = {
      name,
      creator_id: userId,
      course_id: courseId,
    };
    const _group = await group.create(newGroup);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    const newJoin = {
      user_id: userId,
      group_id: _group.rows[0].id,
      join_date: new Date(),
    };
    const _join = await joinedG.create(newJoin);
    if (_join.errors) {
      return Helpers.dbError(res, _join);
    }
    return Helpers.sendResponse(res, 200, 'Group created successfully', { group: _group.rows[0] });
  }

  // join group
  static async joinGroup(req, res) {
    const { groupId, userId } = req.body;
    const newJoin = {
      user_id: userId,
      group_id: groupId,
      join_date: new Date(),
    };
    const _join = await joinedG.create(newJoin);
    if (_join.errors) {
      return Helpers.dbError(res, _join);
    }
    return Helpers.sendResponse(res, 200, 'Group joined successfully', {
      group: _join.rows,
    });
  }

  // delete group
  static async deleteGroup(req, res) {
    const { id } = req.params;
    const _group = await group.delete({ id });
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'Group deleted successfully');
  }

  // leave group
  static async leaveGroup(req, res) {
    const { groupId } = req.body;
    const data = { leave_date: new Date() };
    const where = { id: groupId };
    const _group = await joinedG.update(data, where);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'Group left successfully');
  }

  // get users joined groups
  static async myGroups(req, res) {
    const { userId } = req.body;
    const _group = await joinedG.getByUser(userId);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    console.log('resp', _group);
    return Helpers.sendResponse(res, 200, 'success', { myGroups: _group.rows });
  }

  // get one group
  static async groupById(req, res) {
    const { id } = req.params;
    const _group = await group.getById(id);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'success', { groups: _group.rows[0] });
  }

  // get group by course
  static async groupByCourse(req, res) {
    const { courseId } = req.params;
    const _group = await group.getByCourse(courseId);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'success', { groups: _group.rows });
  }

  //
}

export default GroupController;
