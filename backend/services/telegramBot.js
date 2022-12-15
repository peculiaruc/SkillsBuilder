import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

// eslint-disable-next-line import/no-cycle
import TelegramController from '../controllers/telegramController';

dotenv.config();

export const bot = new Telegraf(process.env.BOT_TOKEN);

export default async () => {
  try {
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

    bot.hears('hi', (ctx) => ctx.reply('Hey there'));

    bot.catch((err, ctx) => {
      console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
    });

    bot.launch();

    // Enable graceful stopnumber
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
  } catch (e) {
    console.log('bot error', e);
  }
};
