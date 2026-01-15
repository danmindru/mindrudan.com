import { COMMAND_NAMES } from './command-constants';

export const blog = () => {
  const command = {
    name: COMMAND_NAMES.BLOG,
    description: 'read my thoughts on building things',
    run: () => {
      window.open('https://blog.mindrudan.com', '_blank');
      return '📝 Opening blog...';
    },
  };

  return command;
};

