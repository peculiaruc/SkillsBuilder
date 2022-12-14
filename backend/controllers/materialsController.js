import Helpers from '../helpers/helpers';
import Course from '../models/course';
import Material from '../models/courseMaterial';
import User from '../models/users';

const user = new User();
const material = new Material();
const course = new Course();

class MaterialsController {
  static async createCourseMaterial(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const checkMembership = await course.getById(req.body.course_id);
    if (checkMembership.errors) return Helpers.dbError(res, checkMembership);

    if (checkMembership.row.author_id !== currentuser.id) {
      return Helpers.sendResponse(res, 401, 'You are not authorised to perform this task');
    }

    const newMaterial = {
      ...req.body,
    };
    const _new = await material.create(newMaterial);
    if (_new.errors) return Helpers.dbError(res, _new);
    return Helpers.sendResponse(res, 200, 'success', { material: _new.rows });
  }

  static async getMaterialById(req, res) {
    const _material = await material.getById(req.params.id);
    if (_material.errors) return Helpers.dbError(res, _material);
    return Helpers.sendResponse(res, 200, 'success', { material: _material.row });
  }

  static async updateMaterial(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);
    const _material = await material.getById(req.params.id);
    if (_material.errors) return Helpers.dbError(res, _material);

    const _course = await course.getById(_material.row.course_id);
    if (_course.errors) return Helpers.dbError(res, _course);

    if (currentuser.id !== _course.row.author_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }
    const newupdate = {
      ...req.body,
    };
    const _update = await material.update(newupdate, { id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'success', { material: _update.rows[0] });
  }

  static async deleteMaterial(req, res) {
    const currentuser = await Helpers.getLoggedInUser(req, res);

    const _material = await material.getById(req.params.id);
    if (_material.errors) return Helpers.dbError(res, _material);

    const _course = await course.getById(_material.row.course_id);
    if (_course.errors) return Helpers.dbError(res, _course);

    if (currentuser.id !== _course.row.author_id) {
      return Helpers.sendResponse(res, 401, 'User not authorised to perform this task');
    }

    const _update = await material.delete({ id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, 'successfully deleted');
  }
}

export default MaterialsController;
