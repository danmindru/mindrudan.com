import { stripIndents } from 'common-tags';

export const viExit = {
  name: ':wq',
  description: `it's been years.`,
  run: () => {
    setTimeout(() => {
      window.location.href = 'http://stackoverflow.com';
    }, 2000);

    return stripIndents`
      you made it out.
      many do not.
    `;
  },
  options: () => [],
};
