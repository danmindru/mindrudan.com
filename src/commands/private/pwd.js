import { COMMAND_NAMES } from '../command-constants';

export const pwd = {
  name: COMMAND_NAMES.PWD,
  description: 'print name of current/working directory',
  run: () => {
    return 'https://mindrudan.com/';
  },
};
