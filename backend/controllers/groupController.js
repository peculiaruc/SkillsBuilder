import Helpers from '../helpers/helpers';
import Group from '../models/groups';
import JoinedGroup from '../models/joinedGroups';
import moment from 'moment';

const group = new Group();
const joinedG = new JoinedGroup();

class GroupController {
  static async createGroup(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const newGroup = {
      ...req.body,
      owner_id: currentuser.id,
    };
    const _group = await group.create(newGroup);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    const date = moment(new Date()).format('YYYY-MM-DD');
    const newJoin = {
      user_id: currentuser.id,
      group_id: _group.rows[0].id,
      join_date: date,
    };
    const _join = await joinedG.create(newJoin);
    if (_join.errors) {
      return Helpers.dbError(res, _join);
    }
    return Helpers.sendResponse(res, 200, 'Group created successfully', { group: _group.rows[0] });
  }

  static async joinGroup(req, res) {
    const date = moment(new Date()).format('YYYY-MM-DD');

    const newJoin = {
      user_id: req.body.userId,
      group_id: req.params.id,
      join_date: date,
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

  static async updateGroup(req, res) {
    const newupdate = {
      ...req.body,
    };
    const _group = await group.update(newupdate, { id: req.params.id });
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'Group updated successfully', { group: _group.rows[0] });
  }

  static async leaveGroup(req, res) {
    const date = moment(new Date()).format('YYYY-MM-DD');

    const data = { leave_date: date };
    const where = { id: req.params.id };
    const _group = await joinedG.update(data, where);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'Group left successfully');
  }

  static async groupById(req, res) {
    const _group = await group.getById(req.params.id);
    if (_group.errors) {
      return Helpers.dbError(res, _group);
    }
    return Helpers.sendResponse(res, 200, 'success', { groups: _group.row });
  }
}

export default GroupController;
