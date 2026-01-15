import { forcedChalk } from '../../../utils/forcedChalk';

const responses = [
  "mv: File moved! It's in a better place now.",
  'mv: Relocation complete! File is settling into its new home.',
  'mv: Done! File packed its bags and left.',
  'mv: File moved! Forwarding address not provided.',
  'mv: Move successful! File is exploring new directories.',
  'mv: File relocated to /dev/happiness',
];

export const mv = {
  name: 'mv',
  description: 'move files (emotionally)',
  run: (args) => {
    if (!args._[0]) {
      return forcedChalk.red(
        'mv: missing file operand\nMove what? Move on from your ex? Good advice.'
      );
    }
    if (args._[0] === 'fast') {
      return forcedChalk.cyan(
        'mv fast: Moving fast and breaking things! 💨 (Facebook approved)'
      );
    }
    if (args._[1] === 'production') {
      return forcedChalk.red('mv * production: WHAT ARE YOU DOING?! 🚨');
    }
    const response = responses[Math.floor(Math.random() * responses.length)];
    return forcedChalk.green(response);
  },
};
