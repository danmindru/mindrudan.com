import { COMMAND_NAMES } from './command-constants';

export const youtube = () => {
  const command = {
    name: COMMAND_NAMES.YOUTUBE,
    description: 'watch me build things',
    run: () => {
      // Open youtube in new tab
      window.open('https://youtube.com/@danmindru', '_blank');
    },
  };

  return command;
};

