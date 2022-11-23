import Helpers from '../helpers/helpers';
import Group from '../models/groups';
import JoinedGroup from '../models/joinedGroups';

const group = new Group();
const joinedG = new JoinedGroup();

class GroupController {
  static async createGroup(req, res) {
    const newGroup = {
      name: req.body.name,
      creator_id: req.body.userId,
      course_id: req.body.courseId,
    };
    const _group = await group.create(newGroup);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    const newJoin = {
      user_id: req.body.userId,
      group_id: _group.rows[0].id,
      join_date: new Date(),
    };
    const _join = await joinedG.create(newJoin);
    if (_join.errors) {
      return Helpers.dbError(res, _join);
    }
    return Helpers.sendResponse(res, 200, 'Group created successfully', { group: _group.rows[0] });
  }

  static async joinGroup(req, res) {
    const newJoin = {
      user_id: req.body.userId,
      group_id: req.body.groupId,
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

  static async deleteGroup(req, res) {
    const _group = await group.delete({ id: req.params.id });
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'Group deleted successfully');
  }

  static async leaveGroup(req, res) {
    const data = { leave_date: new Date() };
    const where = { id: req.body.groupId };
    const _group = await joinedG.update(data, where);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'Group left successfully');
  }

  static async myGroups(req, res) {
    const _group = await joinedG.allWhere({ user_id: req.body.userId });
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    console.log('resp', _group);
    return Helpers.sendResponse(res, 200, 'success', { myGroups: _group.rows });
  }

  static async groupById(req, res) {
    const _group = await group.getById(req.params.id);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'success', { groups: _group.row });
  }

  static async groupByCourse(req, res) {
    const _group = await group.getByCourse(req.params.courseId);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'success', { groups: _group.row });
  }
}

export default GroupController;
