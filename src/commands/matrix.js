import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const matrixArt = `
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 ░▀█▀░█░█░█▀▀░░░█▄█░█▀█░▀█▀░█▀▄░▀█▀░█░█░░░
 ░░█░░█▀█░█▀▀░░░█░█░█▀█░░█░░█▀▄░░█░░▄▀▄░░░
 ░░▀░░▀░▀░▀▀▀░░░▀░▀░▀░▀░░▀░░▀░▀░▀▀▀░▀░▀░░░
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

const quotes = [
  "Wake up, developer...",
  "The Matrix has you...",
  "Follow the white rabbit. 🐇",
  "Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.",
  "There is no spoon. There is only JavaScript.",
  "I know kung fu. And React. And Vue. And... too many frameworks.",
  "You take the blue pill, the story ends. You take the red pill, you learn Rust.",
  "What if I told you... the bugs were inside the features all along?",
  "Free your mind. Delete node_modules.",
  "Guns. Lots of guns. I mean... npm packages.",
];

export const matrix = () => {
  const command = {
    name: COMMAND_NAMES.MATRIX,
    description: 'take the red pill',
    run: () => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const art = forcedChalk.green(matrixArt);
      const text = forcedChalk.green(`\n"${quote}"\n`);

      return art + text;
    },
  };

  return command;
};

