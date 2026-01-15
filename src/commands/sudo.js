import { COMMAND_NAMES } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const responses = [
  "Nice try, but you're not root here 😏",
  "Permission denied. This isn't your terminal, buddy.",
  "I'm sorry Dave, I'm afraid I can't do that.",
  "You thought you were sneaky, didn't you?",
  "Error: Insufficient coffee levels to grant sudo access ☕",
  "sudo make me a sandwich 🥪",
  "Access denied. Have you tried turning it off and on again?",
  "Root privileges require at least 10 years of vim experience.",
];

export const sudo = () => {
  const command = {
    name: COMMAND_NAMES.SUDO,
    description: 'attempt to gain root access',
    run: () => {
      const response = responses[Math.floor(Math.random() * responses.length)];
      return forcedChalk.red(`\n🔒 ${response}\n`);
    },
  };

  return command;
};

