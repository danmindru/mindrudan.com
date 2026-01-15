import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';

const logLines = [
  '[INFO] User visited website. Impressive.',
  '[DEBUG] Coffee levels: concerning',
  '[WARN] Developer may need sleep',
  '[INFO] Code compiled. Nobody is more surprised than me.',
  "[ERROR] Bug found. Just kidding, it's a feature.",
  '[DEBUG] Attempting to understand legacy code...',
  '[WARN] node_modules growing at alarming rate',
  '[INFO] User typed a command. Gold star!',
  '[ERROR] 404: Motivation not found',
  '[DEBUG] Imposter syndrome: active',
  '[INFO] Successfully procrastinated',
  '[WARN] Meeting in 5 minutes. Code faster.',
  '[ERROR] Stack overflow (the problem, not the solution)',
  '[INFO] git push successful. Prayers sent.',
  '[DEBUG] console.log("here") x 47',
];

export const tail = {
  name: 'tail',
  description: 'output last part of files (satirically)',
  run: (args) => {
    const file = args._[0];
    const follow = args.f;
    const lines = parseInt(args.n) || 10;

    if (!file) {
      return forcedChalk.red(
        'tail: missing file operand\nTry: tail -f /var/log/existence.log'
      );
    }

    if (file.includes('.env')) {
      return forcedChalk.red(
        [
          'tail: Permission denied',
          '',
          'Nice try! The secrets stay secret. 🤫',
        ].join('\n')
      );
    }

    const selectedLines = [];
    for (let i = 0; i < Math.min(lines, logLines.length); i++) {
      selectedLines.push(logLines[Math.floor(Math.random() * logLines.length)]);
    }

    const output = selectedLines.map((line) => {
      if (line.includes('[ERROR]')) return forcedChalk.red(line);
      if (line.includes('[WARN]')) return forcedChalk.yellow(line);
      if (line.includes('[DEBUG]')) return forcedChalk.gray(line);
      return forcedChalk.green(line);
    });

    const header = follow
      ? forcedChalk.cyan(`==> Following ${file} (fake mode) <==`)
      : forcedChalk.cyan(`==> ${file} <==`);

    return [
      header,
      '',
      ...output,
      '',
      follow
        ? forcedChalk.gray(
            "(Press Ctrl+C to stop. It won't work, but try anyway.)"
          )
        : '',
    ].join(EOL);
  },
  options: () => ['-f', '-n'],
};
