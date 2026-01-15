import { forcedChalk } from '../../../utils/forcedChalk';

const deathMessages = [
  "Process terminated. It didn't suffer... much.",
  "Process killed. Send flowers to /dev/null.",
  "Process eliminated. Task failed successfully.",
  "Process ended. It's in a better place now (swap space).",
  "Process destroyed. Resistance was futile.",
  "Process terminated. It saw this coming.",
];

export const kill = {
  name: 'kill',
  description: 'terminate processes (virtually)',
  run: (args) => {
    const pid = args._[0];

    if (!pid) {
      return forcedChalk.red("kill: usage: kill [-9] <pid>\n\nNo PID provided. What do you want to kill? Your dreams?");
    }

    if (pid === '-9' || args['9']) {
      return forcedChalk.red([
        "kill -9: SIGKILL sent! ☠️",
        "",
        "Process didn't even get to say goodbye.",
        "Brutal. Efficient. Like Monday mornings.",
      ].join('\n'));
    }

    if (pid === 'all' || pid === '*') {
      return forcedChalk.red([
        "kill *: Whoa there, calm down! 🛑",
        "",
        "You can't just kill everything!",
        "This isn't a video game.",
        "(Actually it kind of is)",
      ].join('\n'));
    }

    if (pid === '1') {
      return forcedChalk.red("kill 1: Cannot kill init. Nice try, anarchist.");
    }

    const message = deathMessages[Math.floor(Math.random() * deathMessages.length)];
    return forcedChalk.yellow(`kill ${pid}: ${message}`);
  },
  options: () => ['-9', '-SIGKILL'],
};

