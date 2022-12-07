import Helpers from '../helpers/helpers';
import Group from '../models/groups';
import User from '../models/users';
import Post from '../models/posts';
import JoinedGroup from '../models/joinedGroups';

const group = new Group();
const user = new User();
const post = new Post();
const joinedGroups = new JoinedGroup();

class PostController {
  static async createPost(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const checkMembership = await joinedGroups.allWhere({
      group_id: req.body.group_id,
      user_id: currentuser.id,
    });
    if (checkMembership.errors) return Helpers.dbError(res, checkMembership);

    if (checkMembership.rows[0].status !== 'accepted') {
      return Helpers.sendResponse(res, 401, 'You are not a member of this group');
    }

    const newPost = {
      ...req.body,
      owner_id: currentuser.id,
    };
    const _post = await post.create(newPost);
    if (_post.errors) return Helpers.dbError(res, _post);
    return Helpers.sendResponse(res, 200, 'success', { post: _post.rows });
  }

  static async getPostById(req, res) {
    const _post = await post.getById(req.params.id);
    if (_post.errors) return Helpers.dbError(res, _post);
    return Helpers.sendResponse(res, 200, 'success', { post: _post.row });
  }

  static async updatePost(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _post = await post.getById(req.params.id);
    if (_post.errors) return Helpers.dbError(res, _post);

    if (currentuser.id !== _post.row.owner_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const newupdate = {
      ...req.body,
    };
    const _update = await post.update(newupdate, { id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'success', { post: _update.rows[0] });
  }

  static async deletePost(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);

    const _post = await post.getById(req.params.id);
    if (_post.errors) return Helpers.dbError(res, _post);

    if (currentuser.id !== _post.row.owner_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }

    const _update = await post.delete({ id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'successfully deleted');
  }
}

export default PostController;
