import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

export const age = () => {
  const command = {
    name: COMMAND_NAMES.AGE,
    description: 'how long have I been shipping?',
    run: () => {
      const now = new Date();
      const careerStart = new Date('2010-01-01'); // Adjust as needed
      const siteStart = new Date('2019-01-01'); // When the site was created
      const birthYear = 1990; // Adjust as needed

      const yearsOld = now.getFullYear() - birthYear;
      const careerYears = Math.floor(
        (now - careerStart) / (1000 * 60 * 60 * 24 * 365)
      );
      const siteAgeMs = now - siteStart;
      const siteDays = Math.floor(siteAgeMs / (1000 * 60 * 60 * 24));
      const siteYears = Math.floor(siteDays / 365);

      // Calculate session time
      const sessionStart = window.sessionStartTime || now;
      const sessionMs = now - sessionStart;
      const sessionMinutes = Math.floor(sessionMs / 60000);
      const sessionSeconds = Math.floor((sessionMs % 60000) / 1000);

      // Store session start time
      if (!window.sessionStartTime) {
        window.sessionStartTime = now;
      }

      const header = forcedChalk.yellow('📅 Age Stats') + EOL;
      const divider = forcedChalk.gray('─'.repeat(40)) + EOL;

      const stats = [
        `${forcedChalk.cyan('Human years:')}       ${forcedChalk.white(
          `~${yearsOld} years old`
        )}`,
        `${forcedChalk.cyan('Dev experience:')}    ${forcedChalk.white(
          `${careerYears}+ years`
        )}`,
        `${forcedChalk.cyan('Site age:')}          ${forcedChalk.white(
          `${siteYears} years, ${siteDays % 365} days`
        )}`,
        `${forcedChalk.cyan('Session time:')}      ${forcedChalk.white(
          `${sessionMinutes}m ${sessionSeconds}s`
        )}`,
        `${forcedChalk.cyan('Coffees today:')}     ${forcedChalk.white(
          `${Math.floor(Math.random() * 5) + 2} ☕`
        )}`,
        `${forcedChalk.cyan('Lines shipped:')}     ${forcedChalk.white(
          '∞ (and counting)'
        )}`,
      ].join(EOL);

      return `${EOL}${header}${divider}${EOL}${stats}${EOL}`;
    },
  };

  return command;
};
