import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const jokes = [
  { q: "Why do programmers prefer dark mode?", a: "Because light attracts bugs." },
  { q: "Why do Java developers wear glasses?", a: "Because they can't C#." },
  { q: "What's a programmer's favorite hangout place?", a: "Foo Bar." },
  { q: "Why did the developer go broke?", a: "Because he used up all his cache." },
  { q: "How many programmers does it take to change a light bulb?", a: "None. It's a hardware problem." },
  { q: "Why do programmers always mix up Halloween and Christmas?", a: "Because Oct 31 == Dec 25." },
  { q: "What's a programmer's favorite karate move?", a: "Try-catch!" },
  { q: "Why did the programmer quit his job?", a: "Because he didn't get arrays." },
  { q: "What do you call 8 hobbits?", a: "A hobbyte." },
  { q: "Why did the functions stop calling each other?", a: "They had too many arguments." },
  { q: "A SQL query walks into a bar, walks up to two tables and asks...", a: "'Can I join you?'" },
  { q: "Why do programmers hate nature?", a: "It has too many bugs." },
  { q: "What's a computer's least favorite food?", a: "Spam." },
  { q: "Why was the JavaScript developer sad?", a: "Because he didn't Node how to Express himself." },
  { q: "What do you call a developer who doesn't comment their code?", a: "A monster." },
  { q: "Why did the developer stay home?", a: "He couldn't find his keys (SSH keys)." },
  { q: "What's a dev's favorite tea?", a: "Localhost." },
  { q: "What did the router say to the doctor?", a: "'It hurts when IP.'" },
];

export const joke = () => {
  const command = {
    name: COMMAND_NAMES.JOKE,
    description: 'get a random programming joke',
    run: () => {
      const { q, a } = jokes[Math.floor(Math.random() * jokes.length)];
      const question = forcedChalk.cyan(`Q: ${q}`);
      const answer = forcedChalk.yellow(`A: ${a}`);

      return `${EOL}😄 ${question}${EOL}${EOL}   ${answer}${EOL}`;
    },
  };

  return command;
};

