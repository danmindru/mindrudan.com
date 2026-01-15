import { forcedChalk } from '../../../utils/forcedChalk';

const responses = [
  'cp: Copied! The original is jealous now.',
  'cp: File duplicated! It has an identical twin.',
  'cp: Copy complete! Like a digital photocopier.',
  'cp: Done! Now there are two of them. This is getting out of hand.',
  'cp: Copied successfully! The simulation now has two versions.',
  "cp: Clone created! It's asking existential questions.",
];

export const cp = {
  name: 'cp',
  description: 'copy files (theoretically)',
  run: (args) => {
    if (!args._[0]) {
      return forcedChalk.red(
        'cp: missing file operand\nCopy what? Your hopes and dreams?'
      );
    }
    if (args._[0] === 'homework') {
      return forcedChalk.yellow(
        'cp homework homework_copy: Academic integrity violation detected! 📚'
      );
    }
    const response = responses[Math.floor(Math.random() * responses.length)];
    return forcedChalk.green(response);
  },
};
