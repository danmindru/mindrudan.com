import { stripIndents } from 'common-tags';
import { COMMAND_NAMES } from './command-constants';

export const contact = () => {
  const command = {
    name: COMMAND_NAMES.CONTACT,
    description: `don't be a stranger`,
    run: () => stripIndents`
    --

    Drop me a mail anytime
    <nadurdim(at)icloud.com>

    --
  `
  };

  return command
}
