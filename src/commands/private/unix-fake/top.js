import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';

export const top = {
  name: 'top',
  description: 'display system processes (satirically)',
  run: () => {
    const uptime = Math.floor(Math.random() * 365) + ' days';
    const load = (Math.random() * 3).toFixed(2);

    const header = [
      forcedChalk.cyan(
        `top - ${new Date().toLocaleTimeString()} up ${uptime}, 1 user, load average: ${load}, ${load}, ${load}`
      ),
      forcedChalk.cyan(
        `Tasks: 42 total, 1 running, 40 sleeping, 1 procrastinating`
      ),
      forcedChalk.cyan(`%Cpu(s): 69.0 us, 4.20 sy, 0.0 ni, 26.8 id, 0.0 wa`),
      forcedChalk.cyan(
        `MiB Mem: 16384.0 total, 42.0 free, 8000.0 used, 8342.0 Chrome`
      ),
      '',
    ];

    const processHeader = forcedChalk.white(
      '  PID USER      CPU%   MEM%   COMMAND'
    );

    const processes = [
      { pid: 1, user: 'dan', cpu: '99.9', mem: '0.1', cmd: 'shipping-code' },
      {
        pid: 2,
        user: 'dan',
        cpu: '80.0',
        mem: '50.0',
        cmd: 'chrome --tabs=infinity',
      },
      {
        pid: 3,
        user: 'dan',
        cpu: '15.0',
        mem: '30.0',
        cmd: 'vscode-eating-ram',
      },
      {
        pid: 4,
        user: 'dan',
        cpu: '10.0',
        mem: '5.0',
        cmd: 'stack-overflow-refresh',
      },
      {
        pid: 5,
        user: 'dan',
        cpu: '5.0',
        mem: '2.0',
        cmd: 'pretending-to-work',
      },
      {
        pid: 6,
        user: 'root',
        cpu: '0.1',
        mem: '0.1',
        cmd: 'existential-crisis',
      },
    ];

    const rows = processes.map((p) => {
      return `${forcedChalk.yellow(
        p.pid.toString().padStart(5)
      )} ${forcedChalk.green(p.user.padEnd(8))}  ${p.cpu.padStart(
        5
      )}  ${p.mem.padStart(5)}   ${forcedChalk.white(p.cmd)}`;
    });

    return [
      ...header,
      processHeader,
      ...rows,
      '',
      forcedChalk.gray("Press q to quit (it won't work)"),
    ].join(EOL);
  },
};
