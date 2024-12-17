"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboardMarkup = void 0;
const __1 = require("..");
const cancelKeyboardMarkup = {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: '✖️ Cancel',
                    callback_data: JSON.stringify({
                        command: __1.CallbackInfo.CANCEL,
                    }),
                },
            ],
        ],
    }),
};
const socialsKeyboardMarkup = [
    [
        {
            text: '💻 Website',
            url: 'https://1001mg.fun/',
        },
    ],
    [
        {
            text: '📱 Telegram',
            url: 'https://t.me/onethousandonemg',
        },
        {
            text: '🕊 Twitter / X',
            url: 'https://x.com/1thousand1MG',
        },
    ],
    [
        {
            text: '🔙 Back',
            callback_data: JSON.stringify({
                command: __1.CallbackInfo.BACK,
            }),
        },
    ],
];
const startKeyboardMarkup = [
    [
        {
            text: '🌎 Website',
            url: 'https://logix-ai.tech/',
        },
        {
            text: '🕊 X',
            url: 'https://x.com/logixaitoken',
        },
    ],
    [
        {
            text: '🤖 Command',
            callback_data: JSON.stringify({
                command: __1.CallbackInfo.TTG,
            }),
        },
    ],
];
const welcomeKeyboardMarkup = {
    parse_mode: 'Markdown',
    caption: __1.textInfo.welcome,
    reply_markup: JSON.stringify({
        inline_keyboard: startKeyboardMarkup,
    }),
};
exports.keyboardMarkup = {
    cancel: cancelKeyboardMarkup,
    start: startKeyboardMarkup,
    socials: socialsKeyboardMarkup,
    welcome: welcomeKeyboardMarkup,
};
//# sourceMappingURL=index.js.map