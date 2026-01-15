import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';

export const find = {
  name: 'find',
  description: 'find files (or yourself)',
  run: (args) => {
    const query = args._[0] || '';

    if (!query) {
      return forcedChalk.yellow(
        "find: What are you looking for?\n\nMaybe try: find . -name 'purpose'"
      );
    }

    if (query.includes('meaning') || query.includes('purpose')) {
      return [
        forcedChalk.cyan('Searching for meaning...'),
        '',
        forcedChalk.yellow('./life/purpose: Ship cool things'),
        forcedChalk.yellow('./life/meaning: Help others'),
        forcedChalk.yellow('./happiness/source: Building stuff'),
        '',
        forcedChalk.green('✨ Found it! Now go build something.'),
      ].join(EOL);
    }

    if (query.includes('bug')) {
      return [
        forcedChalk.red('find: Found too many results'),
        '',
        './src/bug1.js',
        './src/bug2.js',
        './src/bug3.js',
        '... (1,847 more)',
        '',
        forcedChalk.yellow("They're not bugs, they're surprise features!"),
      ].join(EOL);
    }

    if (query.includes('nemo')) {
      return forcedChalk.cyan(
        '🐠 Found Nemo! He was in /ocean/reef/anemone the whole time!'
      );
    }

    return [
      forcedChalk.cyan(`Searching for "${query}"...`),
      '',
      forcedChalk.gray('./somewhere/over/the/rainbow'),
      forcedChalk.gray('./dev/null (found nothing, as expected)'),
      forcedChalk.gray('./your/imagination'),
      '',
      forcedChalk.yellow('Results may vary. Batteries not included.'),
    ].join(EOL);
  },
};
