export enum CallbackInfo {
  GUID = 1,
  SOCIALS = 2,
  REMOVE_BG = 3,
  CARTOON = 4,
  COLORIZE = 5,
  MEME = 6,
  DESC = 7,
  BACK = 8,
  CANCEL = 9,
  CREDITS = 10,
  SOON_FITUR = 11,
  TTG = 12,
}

const welcome = `
* 🪬 LogiX AI Tech 🪬 *

seamlessly integrates into Web3 workflows, enabling innovators to break new ground and optimize efficiency.

Revolutionizing Web3 with AI-Powered Agents
LogiX redefines how developers, traders, entrepreneurs, and designers engage with the Web3 ecosystem. 
By harnessing cutting-edge AI agents, the platform simplifies intricate tasks, accelerates processes, and unlocks new levels of innovation.
`;

const guidline = `
*Guidelines for Using Cryptnative AI*:

1. Remove Background:
Command: /removebg
Instructions: Upload your photo with the command /removebg to instantly remove the background. Enjoy a clean and focused image!

2. Meme Generator:
Command: /meme
Instructions: Create a meme by uploading an image along with the command /meme. Add a humorous caption to bring your meme to life!

1. Transform Photo to Cartoon:
Command: /cartoon
Instructions: Turn your photo into a cartoon masterpiece! Upload your image using the command /cartoon 
(*Cartoon Type is optional*)
or specify the cartoon type (e.g., /cartoon&4 for a specific style).
Cartoon type, the value can be 0,1,2,3,4,5,6,7,8,9,10 

4. Colorize Black and White Photos:
Command: /colorize
Instructions: Bring black and white photos to life! 
Use the command /colorize and upload your monochrome image to see it magically colorized.

Ensure your uploaded photos meet the recommended resolution for optimal results.
Experiment with different commands and parameters to discover the full range of creative possibilities!
Unleash your creativity with Cryptnative AI! 🌟 #CryptnativeAI #Guidelines #DigitalArtistry
`;

const description = `

*Meme Generator Fun!*
Generate hilarious memes in seconds. Inject humor into your moments!

*Trading Companion!*
Receive real-time market insights, trend analysis, and personalized suggestions, 
empowering you to make informed decisions!

Experience limitless creativity now! Start exploring and crafting with *Meme Generator AI*. 🎨✨ \n #UnleashCreativity #DigitalArtistry
`;

const comming_soon = `*This feature will soon be updated in the near future. Please wait as it is still undergoing improvements by the developer.*`;

const commandCartoon = `
*Transform Photo to Cartoon*
Command: /cartoon
Instructions: Turn your photo into a cartoon masterpiece! Upload your image selfie using the command /cartoon 
(*Cartoon Type is optional*)
or specify the cartoon type (e.g., /cartoon&4 for a specific style).
Cartoon type, the value can be 1,2,3,4,5,6,7,8,9,10 
`;
const commandColorize = `
*Colorize Black and White Photos*
Command: /colorize
Instructions: Bring black and white photos to life! 
Use the command /colorize and upload your monochrome image to see it magically colorized.
`;

const commandMeme = `
*1001 Meme Generator*
Command: /meme

Instructions: Spice up your chats with humor! Simply type /meme and let the bot generate a meme for you. 
Want to add a personal touch? Use '/meme=your text here' 
to customize your meme with a caption of your choice. 
e.g, '/meme=cat and dog'
Enjoy the laughter!
`;

const errorCartoonType =
  'The number or cartoon type after the "&" symbol must be in the range 1 to 10';
const errorCondition = 'Invalid Command!';

const limitText = `You have reached your usage limit, try again in 1 x 24 hours`;

const catchErrorText = `Oopss something wrong, please upload another image selfie!`;
const catchBalanceText = `Insufficient balance/credits, please contact the creator!`;

const welcomeLaunch = `
*Tereon Ecosystem ⚡️*

*Redefining Online Privacy
with AI-Powered Solutions*

Tereon Empowering Your Digital Privacy with AI-Driven Tools for Security, Efficiency, and Decentralized Freedom.
`;

export function commingSoon(fitur: string) {
  return `*This feature ${fitur} will soon be updated in the near future. Please wait as it is still undergoing improvements by the developer.*`;
}

const soon_feature = `*This feature will soon be updated in the near future. Please wait as it is still undergoing improvements by the developer.*`;

const instructions = `
Type anything that inspires you—traders, designers, developers, or entrepreneurs—and let LogiX AI turn it into something extraordinary!

*Trader*
- An AI-driven trading agent that analyzes market data, detects trading opportunities through predefined rules or adaptive algorithms, and executes buy or sell orders with precision and efficiency.

*Designer*
- Create NFT concepts and produce visuals customized for blockchain branding and digital identity.

*Developer*
- Simplify blockchain application development and automate the deployment of smart contracts.

*Entrepreneur*
- Optimize business operations with AI-driven insights and enable data-informed decision-making for growth and innovation.
`;

export function detectNumber(text: string) {
  const str = text;
  const regex = /&(\d+)/;
  return str.match(regex);
}

export function detectTextMeme(text: string) {
  const str = text;
  const regex = /^\/meme(?:=(.+))?$/;
  return str.match(regex);
}

export function generateNumber0to7() {
  return Math.floor(Math.random() * 8);
}

export const textInfo = {
  welcome,
  comming_soon,
  description,
  guidline,
  errorCartoonType,
  limitText,
  commandCartoon,
  catchErrorText,
  catchBalanceText,
  soon_feature,
  commandColorize,
  errorCondition,
  commandMeme,
  welcomeLaunch,
  instructions,
};
