import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';

export const df = {
  name: 'df',
  description: 'disk free space (imaginary)',
  run: (args) => {
    const human = args.h;

    const header = forcedChalk.cyan(
      human
        ? 'Filesystem      Size  Used  Avail Use% Mounted on'
        : 'Filesystem     1K-blocks      Used Available Use% Mounted on'
    );

    const filesystems = [
      {
        fs: '/dev/imagination',
        size: '∞',
        used: '0',
        avail: '∞',
        pct: '0%',
        mount: '/dreams',
      },
      {
        fs: '/dev/node_modules',
        size: '999T',
        used: '999T',
        avail: '0',
        pct: '100%',
        mount: '/despair',
      },
      {
        fs: '/dev/coffee',
        size: '10G',
        used: '9.9G',
        avail: '100M',
        pct: '99%',
        mount: '/energy',
      },
      {
        fs: '/dev/motivation',
        size: '1G',
        used: '999M',
        avail: '1M',
        pct: '99%',
        mount: '/productivity',
      },
      {
        fs: '/dev/chrome-tabs',
        size: '64G',
        used: '63G',
        avail: '1G',
        pct: '98%',
        mount: '/memory',
      },
      {
        fs: '/dev/null',
        size: '∞',
        used: '∞',
        avail: '∞',
        pct: '?%',
        mount: '/void',
      },
    ];

    const rows = filesystems.map((f) => {
      const warning =
        f.pct === '100%' ? forcedChalk.red(f.pct) : forcedChalk.green(f.pct);
      return `${forcedChalk.yellow(f.fs.padEnd(18))} ${f.size.padStart(
        5
      )} ${f.used.padStart(5)} ${f.avail.padStart(5)} ${warning.padStart(
        4
      )} ${forcedChalk.white(f.mount)}`;
    });

    return [
      header,
      ...rows,
      '',
      forcedChalk.gray(
        'Warning: node_modules is consuming all available space'
      ),
    ].join(EOL);
  },
  options: () => ['-h'],
};
