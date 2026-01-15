import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const coffeeArt = `
       ) )
      ( (
    .------.
    |      |]
    \\      /
     \`----'
`;

const quotes = [
  "A developer is a machine that turns coffee into code.",
  "Coffee: because debugging at 3am requires fuel.",
  "First, solve the problem. Then, pour the coffee.",
  "Life's too short for bad coffee and slow builds.",
  "Coffee && Code === Productivity",
  "npm install coffee --save-dev",
  "git commit -m 'Added more coffee'",
  "Coffee: the original energy drink since 1475.",
  "Espresso yourself through code.",
  "Keep calm and drink coffee... then panic and ship anyway.",
];

export const coffee = () => {
  const command = {
    name: COMMAND_NAMES.COFFEE,
    description: 'essential developer fuel',
    run: () => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const art = forcedChalk.yellow(coffeeArt);
      const text = forcedChalk.gray(`"${quote}"`);
      const bar = forcedChalk.green('█'.repeat(10)) + forcedChalk.gray('░'.repeat(0));
      const caffeine = `${EOL}Caffeine level: ${bar} 100%`;

      return `${art}${EOL}${text}${EOL}${caffeine}${EOL}`;
    },
  };

  return command;
};

