import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const danLogo = `
    ██████╗  █████╗ ███╗   ██╗
    ██╔══██╗██╔══██╗████╗  ██║
    ██║  ██║███████║██╔██╗ ██║
    ██║  ██║██╔══██║██║╚██╗██║
    ██████╔╝██║  ██║██║ ╚████║
    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝
`;

export const neofetch = () => {
  const command = {
    name: COMMAND_NAMES.NEOFETCH,
    description: 'display system info (dan edition)',
    run: () => {
      const logo = forcedChalk.cyan(danLogo);

      const info = [
        `${forcedChalk.cyan('dan')}${forcedChalk.white('@')}${forcedChalk.cyan('mindrudan.com')}`,
        forcedChalk.gray('─'.repeat(24)),
        `${forcedChalk.cyan('OS:')} ${forcedChalk.white('DanOS v2.1.3')}`,
        `${forcedChalk.cyan('Host:')} ${forcedChalk.white('Copenhagen, Denmark')}`,
        `${forcedChalk.cyan('Kernel:')} ${forcedChalk.white('Caffeine-powered v∞')}`,
        `${forcedChalk.cyan('Uptime:')} ${forcedChalk.white('Since ~1990')}`,
        `${forcedChalk.cyan('Shell:')} ${forcedChalk.white('zsh + lots of aliases')}`,
        `${forcedChalk.cyan('DE:')} ${forcedChalk.white('VS Code / Cursor')}`,
        `${forcedChalk.cyan('Terminal:')} ${forcedChalk.white('This one!')}`,
        `${forcedChalk.cyan('CPU:')} ${forcedChalk.white('Brain™ @ variable GHz')}`,
        `${forcedChalk.cyan('Memory:')} ${forcedChalk.white('☕ Coffee / ∞')}`,
        '',
        `${forcedChalk.red('●')} ${forcedChalk.yellow('●')} ${forcedChalk.green('●')} ${forcedChalk.cyan('●')} ${forcedChalk.blue('●')} ${forcedChalk.magenta('●')} ${forcedChalk.white('●')} ${forcedChalk.gray('●')}`,
      ].join(EOL);

      return `${logo}${EOL}${info}${EOL}`;
    },
  };

  return command;
};

