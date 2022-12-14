import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.start((ctx) => ctx.reply('Welcome to SkillBuddy Bot! Your learning partner. To get started type in hello'));

// bot.hears('hello', (ctx) => ctx.reply('Hey there. if this is the first time please reply with phone'));

// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.defaults = bot;
