import { COMMAND_NAMES } from './command-constants';

export const github = () => {
  const command = {
    name: COMMAND_NAMES.GITHUB,
    description: 'check out my code',
    run: () => {
      window.open('https://github.com/danmindru', '_blank');
      return '🐙 Opening GitHub...';
    },
  };

  return command;
};

