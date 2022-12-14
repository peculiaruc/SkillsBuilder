import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

import initializeDb from './db/dbinit';
import {
  authRoute,
  courseRoute,
  socialLoginRoute,
  assignmentRoute,
  groupRoute,
  userRoute,
  questionRoute,
  submissionRoute,
  postsRoute,
  materialRoute,
  lessonRoute,
  lessonContentRoute,
} from './routes';
import TelegramController from './controllers/telegramController';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('short'));

app.use('/home', (req, res) => {
  res.status(200).send('Welcome to this awesome API!!');
});
const apiPath = '/api/v1';
app.use(`${apiPath}/auth`, authRoute);
app.use(`${apiPath}/social`, socialLoginRoute);
app.use(`${apiPath}/course`, courseRoute);
app.use(`${apiPath}/assignment`, assignmentRoute);
app.use(`${apiPath}/submission`, submissionRoute);
app.use(`${apiPath}/question`, questionRoute);
app.use(`${apiPath}/group`, groupRoute);
app.use(`${apiPath}/user`, userRoute);
app.use(`${apiPath}/post`, postsRoute);
app.use(`${apiPath}/material`, materialRoute);
app.use(`${apiPath}/lesson`, lessonRoute);
app.use(`${apiPath}/media`, lessonContentRoute);

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    error: '404 Not Found !',
  });
});

app.listen(PORT, async () => {
  await initializeDb();

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start((ctx) => {
    // console.log('srtart', ctx);
    ctx.reply('Welcome to SkillBuddy Bot! Your learning partner. To get started type in /hello');
  });

  bot.hears('/hello', (ctx) => {
    console.log('hello', ctx);
    ctx.reply('Hey there. if this is the first time please reply with your skillBuddy email');
  });

  bot.email(async (ctx) => {
    console.log(ctx.update.message);
    const data = {
      email: ctx.update.message.text,
      chat_id: ctx.update.message.chat.id,
    };
    const text = await TelegramController.updateUser(data);
    console.log('text', text);
    ctx.reply(text);
  });

  bot.help((ctx) => ctx.reply('Send me a sticker'));
  // bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
  bot.hears('hi', (ctx) => ctx.reply('Hey there'));
  bot.launch();

  // Enable graceful stopnumber
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  console.log(`Listening on port: ${PORT}`);
});

export default app;
