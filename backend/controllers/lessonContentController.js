import Helpers from '../helpers/helpers';
import LessonContent from '../models/lessonContent';
import { SUCCESS } from '../utils/constants';

const content = new LessonContent();

class ContentController {
  static async createContent(req, res) {
    const newContent = {
      ...req.body,
    };
    const _new = await content.create(newContent);
    if (_new.errors) return Helpers.dbError(res, _new);
    return Helpers.sendResponse(res, 200, SUCCESS, { media: _new.rows });
  }

  static async getContentById(req, res) {
    const _content = await content.getById(req.params.id);
    if (_content.errors) return Helpers.dbError(res, _content);
    return Helpers.sendResponse(res, 200, SUCCESS, { media: _content.row });
  }

  static async updateContent(req, res) {
    const _content = await content.getById(req.params.id);
    if (_content.errors) return Helpers.dbError(res, _content);

    const newupdate = {
      ...req.body,
    };
    const _update = await content.update(newupdate, { id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, SUCCESS, { media: _update.rows[0] });
  }

  static async deleteContent(req, res) {
    const _update = await content.delete({ id: req.params.id });
    if (_update.errors) return Helpers.dbError(res, _update);
    return Helpers.sendResponse(res, 200, SUCCESS);
  }
}

export default ContentController;
