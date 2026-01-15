import { COMMAND_NAMES } from './command-constants';

export const linkedin = () => {
  const command = {
    name: COMMAND_NAMES.LINKEDIN,
    description: 'connect with me professionally',
    run: () => {
      window.open('https://linkedin.com/in/danmindru', '_blank');
      return '💼 Opening LinkedIn...';
    },
  };

  return command;
};

