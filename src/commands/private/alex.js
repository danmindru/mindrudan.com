import { stripIndents } from 'common-tags';
import { forcedChalk } from '../../utils/forcedChalk';

export const alex = {
  name: 'alex',
  description: `important discussion`,
  run: () =>
    forcedChalk.magentaBright(stripIndents`
      Dan is super cool, but he is on another level of being cool. Someday he'll be as cool as ${forcedChalk.bold(
        'Alex'
      )}.
    `),
};
