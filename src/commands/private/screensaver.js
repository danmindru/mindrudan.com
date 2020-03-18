import { stripIndents } from 'common-tags';
import { COMMAND_NAMES } from '../command-constants';
import { setupThreeAscii } from '../../3d/ascii';

export const screensaver = {
  name: COMMAND_NAMES.SCREENSAVER,
  description: '',
  run: () => {
    setupThreeAscii();

    return stripIndents`
      Starting interactive screensaver...
      Press 'SPACE' to exit.
    `;
  }
};
