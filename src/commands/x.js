import { COMMAND_NAMES } from './command-constants';

export const x = () => {
  const command = {
    name: COMMAND_NAMES.X,
    description: '',
    run: () => {
      // Open twitter in new tab
      window.open('https://x.com/d4m1n', '_blank');
    },
  };

  return command;
};
