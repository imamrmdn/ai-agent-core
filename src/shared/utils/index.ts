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
* Space Terminal 🌒 *

In the future, AI won't just be a tool—it'll be as fundamental as electricity or water. 
A universal knowledge utility, accessible to everyone.
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

*Let me introduce you to the concept of Space Terminal*

1 What is Space Terminal?

Space Terminal is a decentralized AI utility designed to:
- Answer any question
- Collaborate on ideas
- Solve complex challenges
- Enable creativity

It's not just a chatbot. It’s the AI backbone of civilization.

2 A Universal Utility 

Think of Space Terminal as:

- A public good
- Always available
- Instantly responsive

Whether you're a student, scientist, artist, or CEO Space Terminal adapts to your needs, providing solutions and insights at the speed of thought.

3 Features That Redefine Intelligence 

- Infinite Query: Space Terminal can process ANY question, from simple curiosities to solving interstellar engineering problems.

- Collaboration: Brainstorm, create, and plan with AI as a partner, not just a tool.

- Adaptability: It tailors its responses—explaining science to a child or coding with an expert.

4 Seamless Integration 

Space Terminal isn’t trapped in one app. It’s everywhere:

- Embedded in devices
- Accessible via voice, holograms, or neural links
- Powering cities, businesses, and personal growth

Wherever you are, Space Terminal is there.

5 Why is Space Terminal a Utility?

In the future, information is as vital as energy.
Space Terminal ensures that knowledge, creativity, and innovation are universally available.

It democratizes intelligence. Everyone gets access. No one is left behind.

6 Practical Use Cases 

- Students learn anything, instantly.
- Scientists solve global crises faster.
- Writers co-create stories with AI.
- Engineers design cities in days, not decades.
- Families plan their lives with AI assistants.

The possibilities? Endless.

7 A New Age of Collaboration 🤝=

Space Terminal doesn’t replace humans. It empowers them.

It enhances human potential, turning every individual into a thinker, a creator, and a solver of problems.

AI utility isn’t about replacing us. It’s about uplifting us.

8 The Ethical Core 

Space Terminal is:
- Transparent
- Ethical
- Governed by diverse voices

Misinformation, bias, and misuse are actively prevented. Space Terminal aligns its outputs to truth, fairness, and respect for all perspectives.

9 Imagine the Future 

No more unanswered questions.
No more barriers to knowledge.
No limits to innovation.

Space Terminal isn’t a product. It’s the AI utility that powers a connected, thriving world.

Knowledge isn’t just power—it’s a shared destiny

10 The Space Terminal Age Begins 🔗

What would YOU do with infinite knowledge at your fingertips?

Dream big. The future is here.
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
Type any part of the description and discover how Space Terminal brings your ideas to life ✨
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
