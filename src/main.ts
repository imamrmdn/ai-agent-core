import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//
import * as TelegramBot from 'node-telegram-bot-api';
//
import {
  CallbackInfo,
  detectNumber,
  textInfo,
} from './shared/utils';

import { keyboardMarkup } from './shared/utils/keyboard-markup';

import OpenAI from 'openai';

import 'dotenv/config';

// replace the value below with the Telegram token you receive from @BotFather
const token_bot = process.env.TOKEN_BOT;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token_bot, { polling: true });

const clientOpenAi = new OpenAI({
  apiKey: process.env.OPENAI_APIKEY,
});

async function getAIResponse(prompt: string): Promise<any> {
  try {
    const completion = await clientOpenAi.completions.create({
      prompt,
      model: 'gpt-3.5-turbo-instruct',
      max_tokens: 100,
    });
    console.log({ log_completio: completion.choices[0].text.trim() });
    return completion.choices[0].text.trim();
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return 'We’re unable to process your request right now. Kindly try again shortly.';
  }
}
//
async function main() {
  //
  const app = await NestFactory.create(AppModule);
  //
  app.enableCors({
    origin: '*', // replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      // 'Origin,Content-Type,Authorization,Accept,User-Agent,Cache-Control,Pragma,x-api-key',
      'x-api-key',
    credentials: true,
    exposedHeaders: 'Content-Length',
    maxAge: 43200, // 12 hours
  });

  //
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Listen for any kind of message. There are different kinds of message
  bot.on('message', async (msg) => {
    //
    let messageText = msg.text;
    const chatId = msg.chat.id;
    let match;

    if (msg.caption) {
      //detect number
      match = detectNumber(msg.caption);
    }

    //
    if (messageText === '/start') {

      const videoPath =
        'https://res.cloudinary.com/drmwcjsgc/video/upload/v1734435589/yr4uajlf2n8dy6u3xapg.mp4';

      await bot.sendVideo(chatId, videoPath, keyboardMarkup.welcome as any);
    } else {
      let mssg;

      bot
        .sendMessage(chatId, 'one moment, please...')
        .then((message) => (mssg = message.message_id));

      const resp = await getAIResponse(messageText);
      console.log({ log: resp });

      if (mssg) {
        bot.deleteMessage(chatId, mssg);
      }

      bot.sendMessage(chatId, resp);
    }
  });

  //
  bot.on('callback_query', async (callbackQuery) => {
    const query = callbackQuery;
    const message = query.message;

    const chatId: number = message.chat.id;
    const messageId: number = message.message_id;
    const data = JSON.parse(callbackQuery.data);

    switch (data.command) {
      case CallbackInfo.TTG:
        bot.sendMessage(chatId, textInfo.instructions);
        break;
      case CallbackInfo.MEME:
        bot.sendMessage(chatId, textInfo.commandMeme);
        break;
      // case CallbackInfo.SOON_FITUR:
      //   bot.sendMessage(chatId, textInfo.soon_feature, keyboardMarkup.cancel);
      //   break;
      // case CallbackInfo.GUID:
      //   bot.sendMessage(chatId, textInfo.guidline, keyboardMarkup.cancel);
      //   break;
      case CallbackInfo.SOCIALS:
        bot.editMessageReplyMarkup(
          {
            inline_keyboard: keyboardMarkup.socials,
          },
          {
            chat_id: chatId,
            message_id: message.message_id,
          },
        );
        break;
      case CallbackInfo.DESC:
        bot.sendMessage(chatId, textInfo.description);
        //bot.sendMessage(chatId, textInfo.description, keyboardMarkup.cancel as any);
        break;
      case CallbackInfo.BACK:
        bot.editMessageReplyMarkup(
          {
            inline_keyboard: keyboardMarkup.start,
          },
          {
            chat_id: chatId,
            message_id: message.message_id,
          },
        );
        break;
      case CallbackInfo.CANCEL:
        if (chatId && messageId) {
          bot.deleteMessage(chatId, messageId);
        }
        break;
      default:
        break;
    }
  });

  await app.listen(9060);
  console.log(`chronicle bot is running on: ${await app.getUrl()}`);
}
main();
