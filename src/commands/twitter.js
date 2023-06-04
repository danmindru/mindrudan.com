import { COMMAND_NAMES } from './command-constants';

export const twitter = () => {
  const command = {
    name: COMMAND_NAMES.TWITTER,
    description: 'follow me for tens of tweets',
    run: () => {
      // Open twitter in new tab
      window.open('https://twitter.com/d4m1n', '_blank');
    },
  };

  return command;
};
