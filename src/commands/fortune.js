import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const fortunes = [
  "The best error message is the one that never shows up.",
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
  "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
  "The most disastrous thing that you can ever learn is your first programming language.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Walking on water and developing software from a specification are easy if both are frozen.",
  "If debugging is the process of removing bugs, then programming must be the process of putting them in.",
  "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
  "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
  "It's not a bug – it's an undocumented feature.",
  "In theory, there is no difference between theory and practice. But, in practice, there is.",
  "There are only two hard things in Computer Science: cache invalidation and naming things.",
  "Programming is like sex: one mistake and you have to support it for the rest of your life.",
  "Simplicity is the soul of efficiency.",
  "Make it work, make it right, make it fast.",
  "The computer was born to solve problems that did not exist before.",
];

export const fortune = () => {
  const command = {
    name: COMMAND_NAMES.FORTUNE,
    description: 'receive programming wisdom',
    run: () => {
      const text = fortunes[Math.floor(Math.random() * fortunes.length)];
      const divider = forcedChalk.gray('─'.repeat(50));

      return `${EOL}🔮 ${divider}${EOL}${EOL}   ${forcedChalk.italic.cyan(`"${text}"`)}${EOL}${EOL}   ${divider}${EOL}`;
    },
  };

  return command;
};

