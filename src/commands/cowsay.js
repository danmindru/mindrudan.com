import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const sayings = [
  "Moo! I mean... Hello, developer!",
  "Have you tried turning it off and on again?",
  "This code is udderly fantastic!",
  "Debugging: Being the detective in a crime movie where you're also the murderer.",
  "I'm not fat, I'm just easy to find in code reviews.",
  "In a world full of bugs, be a feature.",
  "Keep calm and git push --force (just kidding, don't)",
  "I before E, except when writing 'weird' JavaScript.",
  "My code doesn't have bugs, it has random features.",
  "I speak fluent JavaScript... and cow.",
  "rm -rf / ? More like rm -rf /my-will-to-live",
  "Talk is cheap. Show me the moo.",
];

const generateCow = (message) => {
  const maxLen = Math.min(message.length, 40);
  const border = '-'.repeat(maxLen + 2);
  const wrappedMessage = message.length > 40
    ? message.substring(0, 37) + '...'
    : message;

  return `
 ${border}
< ${wrappedMessage.padEnd(maxLen)} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
};

export const cowsay = () => {
  const command = {
    name: COMMAND_NAMES.COWSAY,
    description: 'the cow speaks wisdom',
    run: () => {
      const saying = sayings[Math.floor(Math.random() * sayings.length)];
      const cow = generateCow(saying);

      return forcedChalk.white(cow);
    },
  };

  return command;
};

