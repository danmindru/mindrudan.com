import { EOL } from '../../command-constants';
import { forcedChalk } from '../../../utils/forcedChalk';

const fakeResults = [
  { file: 'secrets.txt', line: 42, content: 'The answer to everything is...' },
  { file: 'bugs.log', line: 404, content: 'Bug not found (ironic, right?)' },
  { file: 'motivation.txt', line: 1, content: 'You got this! Ship it!' },
  { file: 'coffee.config', line: 69, content: 'caffeine_level=maximum' },
  { file: 'readme.md', line: 1, content: '# Nobody reads this anyway' },
];

export const grep = {
  name: 'grep',
  description: 'search for patterns (find nothing)',
  run: (args) => {
    if (!args._[0]) {
      return forcedChalk.red(
        "grep: No pattern provided.\ngrep 'meaning of life' universe.txt"
      );
    }

    const pattern = args._[0].toLowerCase();

    if (pattern === 'bug' || pattern === 'bugs') {
      return forcedChalk.yellow(
        `grep: Found 0 bugs.\n\nJust kidding. Found ∞ bugs. They're features now.`
      );
    }

    if (pattern === 'girlfriend' || pattern === 'boyfriend') {
      return forcedChalk.red(
        `grep: No matches found. Have you tried Stack Overflow?`
      );
    }

    const result = fakeResults[Math.floor(Math.random() * fakeResults.length)];
    return [
      forcedChalk.green(`Searching for "${pattern}"...`),
      '',
      forcedChalk.cyan(`${result.file}:${result.line}:`) +
        forcedChalk.white(result.content),
      '',
      forcedChalk.gray('(Results may be entirely fictional)'),
    ].join(EOL);
  },
};
