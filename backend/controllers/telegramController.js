import TelegramuUsers from '../models/telegram';
import User from '../models/users';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const telegramUser = new TelegramuUsers();
const user = new User();

class TelegramController {
  static async updateUser(data) {
    const email = data.email.toLowerCase();
    const _user = await user.getByEmail(email);
    if (_user.errors) return 'Something went wrong try again later!';
    if (_user.count === 0) return 'No user with email Found!';

    const checkIfAlreadyExists = await telegramUser.first('email', '=', email);
    if (checkIfAlreadyExists.errors) return 'Something went wrong try again later!';
    if (checkIfAlreadyExists.count !== 0) return `You're all set to recieve updates!`;
    const newEntry = {
      email,
      user_id: _user.row.id,
      chat_id: data.chat_id,
    };
    const _new = await telegramUser.create(newEntry);
    if (_new.errors) return 'Something went wrong try again later!';
    console.log('create', _new);
    return `You're all set to recieve updates!`;
  }

  static async newCourseUpdate(course) {
    // console.log('course', course);
    const allUsers = await telegramUser.all();
    if (allUsers.errors) return 'Something went wrong try again later!';

    const _user = await user.getById(course.author_id);
    // console.log('user', _user);
    if (allUsers.count > 0) {
      await allUsers.rows.map(async (u) => {
        console.log('tu', u)
        const cap = `Check out this new course ${course.title} by ${_user.row.fullname}`;
        const phot = course.thumbnail
          ? course.thumbnail
          : 'https://cdn.elearningindustry.com/wp-content/uploads/2020/07/virtual-classroom-software-for-remote-teams.jpg';

        const resp = await axios.get(
          `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto?chat_id=${u.chat_id}&caption=${cap}&photo=${phot}`
        );
        console.log(resp);
        return resp;
      });
    }
    return;
  }

  static async newAssignmentUpdate(course) {
    // console.log('course', course);
    const allUsers = await telegramUser.all();
    if (allUsers.errors) return 'Something went wrong try again later!';

    const _user = await user.getById(course.author_id);
    // console.log('user', _user);
    if (allUsers.count > 0) {
      await allUsers.rows.map(async (u) => {
        console.log('tu', u)
        const cap = `Check out this new course ${course.title} by ${_user.row.fullname}`;
        const phot = course.thumbnail
          ? course.thumbnail
          : 'https://cdn.elearningindustry.com/wp-content/uploads/2020/07/virtual-classroom-software-for-remote-teams.jpg';

        const resp = await axios.get(
          `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto?chat_id=${u.chat_id}&caption=${cap}&photo=${phot}`
        );
        console.log(resp);
        return resp;
      });
    }
    return;
  }
}

export default TelegramController;
