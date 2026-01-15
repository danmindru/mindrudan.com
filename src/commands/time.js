import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

export const time = () => {
  const command = {
    name: COMMAND_NAMES.TIME,
    description: 'display current time',
    run: () => {
      const now = new Date();

      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const unix = Math.floor(now.getTime() / 1000);

      const clockArt = `
   ╔══════════════╗
   ║   ${forcedChalk.green(timeStr)}   ║
   ╚══════════════╝
`;

      const info = [
        `${forcedChalk.cyan('Date:')}      ${forcedChalk.white(dateStr)}`,
        `${forcedChalk.cyan('Timezone:')}  ${forcedChalk.white(timezone)}`,
        `${forcedChalk.cyan('Unix:')}      ${forcedChalk.white(unix)}`,
        `${forcedChalk.cyan('Status:')}    ${forcedChalk.yellow('Time to ship! 🚀')}`,
      ].join(EOL);

      return `${clockArt}${EOL}${info}${EOL}`;
    },
  };

  return command;
};

