import { COMMAND_NAMES } from '../command-constants';

export const rm = {
  name: COMMAND_NAMES.RM,
  description: 'remove files or directories',
  run: () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  },
  options: () => [],
};
