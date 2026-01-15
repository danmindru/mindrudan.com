import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';

const fakeProcesses = [
  { pid: 1, name: 'being-awesome', cpu: '99%', status: 'running' },
  { pid: 42, name: 'finding-meaning', cpu: '42%', status: 'thinking' },
  { pid: 404, name: 'page-not-found', cpu: '0%', status: 'missing' },
  { pid: 666, name: 'debugging-at-3am', cpu: '100%', status: 'suffering' },
  { pid: 1337, name: 'being-elite', cpu: '13%', status: 'hacking' },
  { pid: 9000, name: 'power-level', cpu: 'OVER', status: 'screaming' },
  { pid: 80, name: 'http-server', cpu: '1%', status: 'serving looks' },
  { pid: 443, name: 'https-secure', cpu: '2%', status: 'encrypted vibes' },
  { pid: 22, name: 'ssh-daemon', cpu: '0%', status: 'waiting patiently' },
  {
    pid: 3000,
    name: 'react-dev-server',
    cpu: '150%',
    status: 'recompiling...',
  },
];

export const ps = {
  name: 'ps',
  description: 'process status (fictional)',
  run: (args) => {
    const header = forcedChalk.cyan(
      '  PID    CPU     STATUS           COMMAND'
    );
    const divider = forcedChalk.gray('─'.repeat(55));

    const processes =
      args.a || args.aux ? fakeProcesses : fakeProcesses.slice(0, 5);

    const rows = processes.map((p) => {
      const pid = forcedChalk.yellow(p.pid.toString().padStart(5));
      const cpu = forcedChalk.green(p.cpu.padStart(6));
      const status = forcedChalk.gray(p.status.padEnd(16));
      const name = forcedChalk.white(p.name);
      return `${pid}  ${cpu}     ${status} ${name}`;
    });

    return [
      header,
      divider,
      ...rows,
      '',
      forcedChalk.gray('(All processes are imaginary)'),
    ].join(EOL);
  },
  options: () => ['-a', '-aux'],
};
