import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//
import * as TelegramBot from 'node-telegram-bot-api';
//
import {
  CallbackInfo,
  commingSoon,
  detectNumber,
  detectTextMeme,
  generateNumber0to7,
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

//
async function getAIResponse(prompt: string): Promise<any> {
  try {
    const completion = await clientOpenAi.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    //
    return completion.data[0].url;
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return 'Error: Unable to process your request at the moment.';
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

    //
    if (messageText === '/start') {
      //
      const videoPath =
        'https://res.cloudinary.com/drmwcjsgc/image/upload/v1734356262/vd2begernkcmbztaijbe.png';

      await bot.sendPhoto(chatId, videoPath, keyboardMarkup.welcome as any);
    } else {
      let mssg;

      bot
        .sendMessage(chatId, '🔁 build image, please wait a moment...')
        .then((message) => (mssg = message.message_id));

      const resp = await getAIResponse(messageText);
      console.log({ chatId, log: resp });

      if (mssg) {
        bot.deleteMessage(chatId, mssg);
      }

      bot.sendPhoto(chatId, resp, { caption: '🟢 your image is ready'});
      //await bot.sendPhoto(chatId, 'https://res.cloudinary.com/drmwcjsgc/image/upload/v1709733882/chronicle/photo-aji.jpg', { caption: '🟢 Your image is ready'});
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
      //   bot.sendMessage(chatId, textInfo.soon_feature, keyboardMarkup.cancel as any);
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
      // case CallbackInfo.DESC:
      //   bot.sendMessage(chatId, textInfo.description, keyboardMarkup.cancel);
      //   break;
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

  await app.listen(9061);
  console.log(`chronicle bot is running on: ${await app.getUrl()}`);
}
main();
