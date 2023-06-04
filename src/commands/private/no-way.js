import { stripIndents } from 'common-tags';

export const noWay = {
  name: 'no',
  description: `yes`,
  run: () => stripIndents`
    Better believe it.
  `,
  options: () => ['way'],
};
