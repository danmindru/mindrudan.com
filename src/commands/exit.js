import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const farewells = [
  "You can check out any time you like, but you can never leave 🎸",
  "exit? In THIS economy? Just kidding, this is a website.",
  "Error: Cannot exit. Too much fun being had.",
  "Closing terminal... Just kidding! Stay a while. 🙂",
  "exit() is not defined. Neither is leaving.",
  "Segmentation fault (core dumped). Just kidding, please stay!",
  "Are you sure? There's coffee here ☕",
  "exit: command not found (because I want you to stay)",
  "CTRL+W works... but do you really want to leave?",
  "Goodbye! Wait no, come back! There are more commands!",
  "Thank you for visiting! Hope to see you again! 👋",
  "Process terminated. Just kidding, processes can't be terminated here.",
];

const doorArt = `
   ┌─────────┐
   │ ┌─────┐ │
   │ │     │ │
   │ │  ●  │ │
   │ │     │ │
   │ └─────┘ │
   │         │
   └─────────┘
`;

export const exit = () => {
  const command = {
    name: COMMAND_NAMES.EXIT,
    description: 'try to leave (spoiler: you can\'t)',
    run: () => {
      const farewell = farewells[Math.floor(Math.random() * farewells.length)];
      const art = forcedChalk.gray(doorArt);
      const message = forcedChalk.yellow(`\n${farewell}\n`);

      return `${art}${message}`;
    },
  };

  return command;
};

