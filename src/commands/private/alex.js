import { stripIndents } from 'common-tags';
import { forcedChalk } from '../../utils/forcedChalk';

export const alex = {
  name: 'alex',
  description: `important discussion`,
  run: () =>
    forcedChalk.magentaBright(stripIndents`
     ${forcedChalk.bold('Alex')} is cool. Follow on ${forcedChalk.bold(
      'https://x.com/aliszu'
    )}
    `),
};
