import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const rocketArt = `
        🚀
       /|\\
      / | \\
     /  |  \\
    |   |   |
    |   |   |
    |  ~~~  |
    |  ~~~  |
   /|  ~~~  |\\
  / |_______|  \\
 |   |     |   |
 |   |     |   |
  \\  |     |  /
   \\_|_____|_/
      /   \\
     /     \\
    🔥 🔥 🔥
`;

const shippingWisdom = [
  "Ship it! Perfect is the enemy of shipped.",
  "Real artists ship. - Steve Jobs",
  "Done is better than perfect.",
  "If you're not embarrassed by v1, you shipped too late.",
  "Move fast and ship things.",
  "Ship early, ship often, ship with confidence.",
  "The best time to ship was yesterday. The second best time is now.",
  "Talk is cheap. Show me the deployment.",
  "Ideas are worthless without execution (and a good CI/CD).",
  "Keep shipping, keep winning! 🏆",
  "Version 1 is just the beginning.",
  "Your code won't help anyone sitting in a repo. SHIP IT!",
];

export const ship = () => {
  const command = {
    name: COMMAND_NAMES.SHIP,
    description: 'shipping is my religion',
    run: () => {
      const wisdom = shippingWisdom[Math.floor(Math.random() * shippingWisdom.length)];
      const art = forcedChalk.cyan(rocketArt);
      const text = forcedChalk.yellow(`\n"${wisdom}"\n`);

      return art + text;
    },
  };

  return command;
};

