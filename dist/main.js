"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const utils_1 = require("./shared/utils");
const keyboard_markup_1 = require("./shared/utils/keyboard-markup");
const openai_1 = require("openai");
require("dotenv/config");
const token_bot = process.env.TOKEN_BOT;
const bot = new TelegramBot(token_bot, { polling: true });
const clientOpenAi = new openai_1.default({
    apiKey: process.env.OPENAI_APIKEY,
});
async function getAIResponse(prompt) {
    try {
        const completion = await clientOpenAi.completions.create({
            prompt,
            model: 'gpt-3.5-turbo-instruct',
            max_tokens: 100,
        });
        console.log({ log_completio: completion.choices[0].text.trim() });
        return completion.choices[0].text.trim();
    }
    catch (error) {
        console.error('Error with OpenAI API:', error);
        return 'We’re unable to process your request right now. Kindly try again shortly.';
    }
}
async function main() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'x-api-key',
        credentials: true,
        exposedHeaders: 'Content-Length',
        maxAge: 43200,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    bot.on('message', async (msg) => {
        let messageText = msg.text;
        const chatId = msg.chat.id;
        let match;
        if (msg.caption) {
            match = (0, utils_1.detectNumber)(msg.caption);
        }
        if (messageText === '/start') {
            const videoPath = 'https://res.cloudinary.com/drmwcjsgc/video/upload/v1734424350/i2nwu80n88jj6a7qurni.mp4';
            await bot.sendVideo(chatId, videoPath, keyboard_markup_1.keyboardMarkup.welcome);
        }
        else {
            let mssg;
            bot
                .sendMessage(chatId, 'wait a moment...')
                .then((message) => (mssg = message.message_id));
            const resp = await getAIResponse(messageText);
            console.log({ log: resp });
            if (mssg) {
                bot.deleteMessage(chatId, mssg);
            }
            bot.sendMessage(chatId, resp);
        }
    });
    bot.on('callback_query', async (callbackQuery) => {
        const query = callbackQuery;
        const message = query.message;
        const chatId = message.chat.id;
        const messageId = message.message_id;
        const data = JSON.parse(callbackQuery.data);
        switch (data.command) {
            case utils_1.CallbackInfo.TTG:
                bot.sendMessage(chatId, utils_1.textInfo.instructions);
                break;
            case utils_1.CallbackInfo.MEME:
                bot.sendMessage(chatId, utils_1.textInfo.commandMeme);
                break;
            case utils_1.CallbackInfo.SOCIALS:
                bot.editMessageReplyMarkup({
                    inline_keyboard: keyboard_markup_1.keyboardMarkup.socials,
                }, {
                    chat_id: chatId,
                    message_id: message.message_id,
                });
                break;
            case utils_1.CallbackInfo.BACK:
                bot.editMessageReplyMarkup({
                    inline_keyboard: keyboard_markup_1.keyboardMarkup.start,
                }, {
                    chat_id: chatId,
                    message_id: message.message_id,
                });
                break;
            case utils_1.CallbackInfo.CANCEL:
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
//# sourceMappingURL=main.js.map