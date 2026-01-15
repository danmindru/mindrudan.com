import { forcedChalk } from '../../../utils/forcedChalk';

const responses = [
  'touch: File touched! It felt weird about it.',
  'touch: *pokes file* There, I touched it. Happy?',
  'touch: File created! (in your imagination)',
  'touch: Done! File exists in the cloud ☁️ (not really)',
  'touch: Consent obtained. File has been touched.',
  "touch: File touched. It's blushing now.",
  'touch: Created empty file full of hopes and dreams',
];

export const touch = {
  name: 'touch',
  description: 'touch files (consensually)',
  run: (args) => {
    if (!args._[0]) {
      return forcedChalk.red(
        'touch: missing file operand\nWhat did you want to touch? 🤔'
      );
    }
    if (args._[0].endsWith('.env')) {
      return forcedChalk.red('touch: Nice try! Not exposing my secrets 🤫');
    }
    if (args._[0] === 'grass') {
      return forcedChalk.green(
        "touch grass: Great advice! But maybe later, I'm coding. 🌱"
      );
    }
    const response = responses[Math.floor(Math.random() * responses.length)];
    return forcedChalk.green(`${response}\n\n  📄 ${args._[0]}`);
  },
};
