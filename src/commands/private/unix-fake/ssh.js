import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';


export const ssh = {
  name: 'ssh',
  description: 'secure shell (insecurely simulated)',
  run: (args) => {
    const host = args._[0];

    if (!host) {
      return forcedChalk.red("ssh: usage: ssh user@hostname\n\nWhere do you want to go today? (Microsoft, 1995)");
    }

    if (host.includes('production')) {
      return forcedChalk.red([
        "ssh production: 🚨 HOLD UP! 🚨",
        "",
        "Are you sure you want to SSH into production?",
        "On a Friday?",
        "At 4:59 PM?",
        "",
        "Connection refused (for your own good).",
      ].join('\n'));
    }

    if (host.includes('localhost') || host === '127.0.0.1') {
      return forcedChalk.yellow([
        "ssh localhost: You're already here! 🏠",
        "",
        "It's like calling yourself on the phone.",
        "Weird flex but okay.",
      ].join('\n'));
    }

    if (host.includes('@')) {
      const [user, server] = host.split('@');
      return [
        forcedChalk.green(`Connecting to ${server}...`),
        forcedChalk.yellow(`Authenticating as ${user}...`),
        '',
        forcedChalk.cyan('█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█'),
        forcedChalk.cyan('█                              █'),
        forcedChalk.cyan('█   Connection established!    █'),
        forcedChalk.cyan('█   (Just kidding, it\'s fake)  █'),
        forcedChalk.cyan('█                              █'),
        forcedChalk.cyan('█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█'),
        '',
        forcedChalk.gray('Welcome to fake-server! Type "exit" to escape (you can\'t).'),
      ].join(EOL);
    }

    return forcedChalk.red(`ssh: Could not resolve hostname ${host}: This is a website, not a terminal`);
  },
};

