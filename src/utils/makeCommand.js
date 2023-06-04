import { isDebugOn } from './debug';

/**
 * Makes a command with that can accept args
 * @param { string } command
 */
export const makeCommand = (command) => (args) => {
  // Send a command
  if (isDebugOn()) {
    console.log('commands args', args);
  }

  return new Promise((resolve, reject) => {
    const cmd = `${command} ${args._.join(' ')} ${Object.keys(args)
      .filter((key) => key !== '_')
      .map((key) => `${key}=${args[key]}`)}`;

    if (isDebugOn()) {
      console.log('Command to send', cmd);
    }

    resolve(cmd);
  });
};
