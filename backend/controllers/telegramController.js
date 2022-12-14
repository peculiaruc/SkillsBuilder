import axios from 'axios';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

import Course from '../models/course';
import Enrollment from '../models/enrollments';
import TelegramuUsers from '../models/telegram';
import User from '../models/users';

dotenv.config();

const user = new User();
const telegramUser = new TelegramuUsers();
const enrollments = new Enrollment();
const _course = new Course();
const bot = new Telegraf(process.env.BOT_TOKEN);

class TelegramController {
  static async updateUser(data) {
    const email = data.email.toLowerCase();
    const _user = await user.getByEmail(email);
    if (_user.errors) return 'Something went wrong try again later!';
    if (_user.count === 0) return 'No user with email Found!';

    const checkIfAlreadyExists = await telegramUser.first('email', '=', email);
    if (checkIfAlreadyExists.errors) return 'Something went wrong try again later!';
    if (checkIfAlreadyExists.count !== 0) return "You're all set to recieve updates!";
    const newEntry = {
      email,
      user_id: _user.row.id,
      chat_id: data.chat_id,
    };
    const _new = await telegramUser.create(newEntry);
    if (_new.errors) return 'Something went wrong try again later!';
    console.log('create', _new);
    return "You're all set to recieve updates!";
  }

  static async newCourseUpdate(course) {
    // console.log('course', course);
    const allUsers = await telegramUser.all();
    if (allUsers.errors) return 'Something went wrong try again later!';

    const _user = await user.getById(course.author_id);
    // console.log('user', _user);
    if (allUsers.count > 0) {
      await allUsers.rows.map(async (u) => {
        console.log('tu', u);
        const cap = `Check out this new course ${course.title} by ${_user.row.fullname}`;
        const phot = course.thumbnail
          ? course.thumbnail
          : 'https://cdn.elearningindustry.com/wp-content/uploads/2020/07/virtual-classroom-software-for-remote-teams.jpg';

        //   const resp = await axios.get(
        //     `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto?chat_id=${u.chat_id}&caption=${cap}&photo=${phot}`,
        //   );
        //   console.log(resp);
        //   return resp;
        bot.telegram.sendPhoto(u.chat_id, { url: phot }, { caption: cap });
      });
    }
  }

  static async newAssignmentUpdate(assignment) {
    // console.log('course', course);
    const allUsers = await telegramUser.all();
    if (allUsers.errors) return 'Something went wrong try again later!';

    // get users in course
    const _usersEnrolled = await enrollments.allWhere({ course_id: assignment.course_id });
    if (_usersEnrolled.errors) return 'Something went wrong try again later!';

    // course details
    const _courseDetails = await _course.getById(assignment.course_id);
    if (_courseDetails.errors) return 'Something went wrong try again later!';

    // check if we have users chat id and send them notification
    const savedIds = allUsers.rows;
    const users = _usersEnrolled.rows;

    await savedIds.map(async (er) => {
      const present = await users.some((e) => e.user_id === er.user_id);
      if (present) {
        bot.telegram.sendPhoto(
          er.chat_id,
          {
            url: 'https://thumbs.dreamstime.com/z/conceptual-hand-writing-showing-assignment-business-photo-text-task-particular-job-assigned-to-someone-as-part-work-conceptual-129596433.jpg',
          },
          { caption: `New Assignment has been added to ${_courseDetails.row.title}` },
        );
      }
    });
  }
}

export default TelegramController;
