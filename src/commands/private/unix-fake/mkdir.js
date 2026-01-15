import { forcedChalk } from '../../../utils/forcedChalk';

const responses = [
  'mkdir: Directory created! Just kidding, this is a website.',
  "mkdir: *pretends to create folder* Done! It's imaginary.",
  "mkdir: Sorry, we're out of folders. Budget cuts.",
  'mkdir: Created folder in /dev/imagination',
  'mkdir: Folder created successfully in a parallel universe',
  'mkdir: Error: Cannot create directory. Disk is full of memes.',
  'mkdir: Done! Folder exists only in your heart now.',
];

export const mkdir = {
  name: 'mkdir',
  description: 'make directory (pretend)',
  run: (args) => {
    if (!args._[0]) {
      return forcedChalk.red(
        "mkdir: missing operand\nTry 'mkdir --help' for more information.\n\nJust kidding, there's no help. This is fake."
      );
    }
    if (args._[0] === 'node_modules') {
      return forcedChalk.red(
        'mkdir: Are you TRYING to fill up my disk? 📦📦📦'
      );
    }
    const response = responses[Math.floor(Math.random() * responses.length)];
    return forcedChalk.green(`${response}\n\n  📁 ${args._[0]}/`);
  },
};
