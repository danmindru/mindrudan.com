import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';


const fakeHistory = [
  'npm install',
  'npm install',
  'rm -rf node_modules',
  'npm install',
  'why is this not working',
  'git status',
  'git add .',
  'git commit -m "fix"',
  'git commit -m "actual fix"',
  'git commit -m "fix for real this time"',
  'sudo rm -rf / --no-preserve-root',  // yikes
  'clear',
  'echo "I am a good developer"',
  'ls -la',
  'cd ..',
  'cd ..',
  'cd ..',
  'pwd',
  'where am i',
  'coffee --refill',
  'stackoverflow search "why javascript"',
  'man woman',  // classic
  'exit',
  'exit',
  'EXIT',
  'please exit',
  'vim file.txt',
  ':q',
  ':q!',
  ':wq',
  'how to exit vim',
  'HELP',
  'curl wttr.in',
  'ping google.com',
  'ssh production@server',
  'oh no',
  'git revert HEAD',
  'git push --force',
  'updating resume...',
];

export const history = {
  name: 'history',
  description: 'command history (embarrassing)',
  run: (args) => {
    const clear = args.c;

    if (clear) {
      return forcedChalk.yellow([
        'history -c: Clearing history...',
        '',
        'Nice try. The internet never forgets.',
        'Your ISP still knows. Google definitely knows.',
        'Your mom probably knows too.',
      ].join('\n'));
    }

    const numLines = Math.min(parseInt(args._[0]) || 25, fakeHistory.length);
    const selectedHistory = fakeHistory.slice(0, numLines);

    const output = selectedHistory.map((cmd, i) => {
      const num = (i + 1).toString().padStart(4);

      // Color code embarrassing commands
      if (cmd.includes('rm -rf /')) return `${forcedChalk.red(num)}  ${forcedChalk.red(cmd)} ${forcedChalk.red('← WHAT')}`;
      if (cmd.includes('exit vim')) return `${forcedChalk.yellow(num)}  ${forcedChalk.yellow(cmd)}`;
      if (cmd.includes('--force')) return `${forcedChalk.red(num)}  ${forcedChalk.red(cmd)}`;
      if (cmd.includes('oh no')) return `${forcedChalk.red(num)}  ${forcedChalk.red(cmd)}`;
      if (cmd.includes('resume')) return `${forcedChalk.yellow(num)}  ${forcedChalk.yellow(cmd)}`;

      return `${forcedChalk.gray(num)}  ${forcedChalk.white(cmd)}`;
    });

    return [
      forcedChalk.cyan('Command History (Totally Not Fake):'),
      '',
      ...output,
      '',
      forcedChalk.gray('(Your actual history is probably worse)'),
    ].join(EOL);
  },
  options: () => ['-c'],
};

