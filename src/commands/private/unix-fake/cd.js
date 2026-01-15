import { forcedChalk } from '../../../utils/forcedChalk';

const responses = [
  "cd: You're already where you need to be. This is a website.",
  "cd: Nice try! But there's nowhere to go. You're home.",
  "cd: *teleports you nowhere* You're still here!",
  'cd: Error: Cannot escape the matrix',
  'cd: Directory changed to /dev/null... just kidding, nothing happened',
  "cd: You've been standing in the same spot this whole time",
  'cd ~/happiness: Permission denied (requires coffee)',
  'cd: Attempting to move... nope, still a website',
];

export const cd = {
  name: 'cd',
  description: 'change directory (or so you think)',
  run: (args) => {
    if (args._[0] === '..') {
      return forcedChalk.yellow(
        'cd: Going back? There is no back. Only forward. Ship it!'
      );
    }
    if (args._[0] === '~') {
      return forcedChalk.green("cd: 🏠 You're already home. Welcome!");
    }
    if (args._[0] === '/') {
      return forcedChalk.red('cd: Root access? In THIS economy?');
    }
    const response = responses[Math.floor(Math.random() * responses.length)];
    return forcedChalk.yellow(response);
  },
  options: () => ['..', '~', '/'],
};
