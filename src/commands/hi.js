import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const greetings = [
  { text: "Hey there! 👋 Thanks for stopping by!", emoji: "🎉" },
  { text: "Hello, fellow human! Welcome to my terminal.", emoji: "🤖" },
  { text: "Hi! Glad you found your way here.", emoji: "🗺️" },
  { text: "Greetings, traveler of the internet!", emoji: "🌐" },
  { text: "Hey! You must be a developer. I can tell by the curiosity.", emoji: "🔍" },
  { text: "Welcome! Make yourself at home. Type 'man' for commands.", emoji: "🏠" },
  { text: "Hi there! You've got great taste in websites.", emoji: "⭐" },
  { text: "Hello! Fancy meeting you here in my terminal.", emoji: "💻" },
  { text: "Hey! Thanks for not just scrolling past. You're awesome!", emoji: "🙌" },
  { text: "Salutations! Ready to explore?", emoji: "🚀" },
];

const waveArt = `
   ╭──────────────────────────╮
   │  (づ｡◕‿‿◕｡)づ  HELLO!   │
   ╰──────────────────────────╯
`;

export const hi = () => {
  const command = {
    name: COMMAND_NAMES.HI,
    description: 'say hello',
    run: () => {
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      const art = forcedChalk.cyan(waveArt);
      const message = forcedChalk.yellow(`${greeting.emoji} ${greeting.text}`);

      const tips = [
        forcedChalk.gray("Try these commands:"),
        forcedChalk.cyan("  startups") + forcedChalk.gray(" - see what I'm building"),
        forcedChalk.cyan("  whoami") + forcedChalk.gray("   - learn about me"),
        forcedChalk.cyan("  joke") + forcedChalk.gray("     - get a programming joke"),
        forcedChalk.cyan("  ship") + forcedChalk.gray("     - shipping wisdom"),
      ].join(EOL);

      return `${art}${EOL}${message}${EOL}${EOL}${tips}${EOL}`;
    },
  };

  return command;
};

