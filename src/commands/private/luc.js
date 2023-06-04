import { stripIndents } from 'common-tags';
import { forcedChalk } from '../../utils/forcedChalk';

export const luc = {
  name: 'luc',
  description:
    'only one can be the first to find the horrors that lurk in the dark.',
  run: () => {
    return forcedChalk.green(stripIndents`
      ${forcedChalk.bold(
        'Luc'
      )} was once the first. It went all downhill from there.
      He slowly started to like ${forcedChalk.bold(
        'Angular'
      )} and couldn't get enough of ${forcedChalk.bold(
      'jQuery'
    )} and ${forcedChalk.bold(
      'Wordpress'
    )}. It has become an obsession that consumed the very essence of his being.

      We now only remember him by this tweet: ${forcedChalk.bold(
        'https://twitter.com/devbyluc/status/1665340362385248258?s=20'
      )}
    `);
  },
};
