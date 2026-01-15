import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const skills = [
  { name: 'JavaScript/TypeScript', level: 95 },
  { name: 'React / Next.js', level: 92 },
  { name: 'Node.js', level: 88 },
  { name: 'CSS / Tailwind', level: 90 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Shipping Products', level: 99 },
  { name: 'Coffee Consumption', level: 100 },
  { name: 'Pizza Appreciation', level: 100 },
  { name: 'Git Fu', level: 87 },
  { name: 'DevOps / CI/CD', level: 75 },
  { name: 'Debugging at 3am', level: 78 },
  { name: 'Making Dad Jokes', level: 94 },
];

const renderBar = (level) => {
  const filled = Math.floor(level / 5);
  const empty = 20 - filled;
  const bar = forcedChalk.green('█'.repeat(filled)) + forcedChalk.gray('░'.repeat(empty));
  return bar;
};

export const skillsCommand = () => {
  const command = {
    name: COMMAND_NAMES.SKILLS,
    description: 'view my skill levels',
    run: () => {
      const header = forcedChalk.yellow('⚡ Skill Points') + EOL;
      const divider = forcedChalk.gray('─'.repeat(50)) + EOL;

      const skillBars = skills
        .map(({ name, level }) => {
          const label = forcedChalk.cyan(name.padEnd(22));
          const bar = renderBar(level);
          const percent = forcedChalk.white(`${level}%`);
          return `${label} ${bar} ${percent}`;
        })
        .join(EOL);

      return `${EOL}${header}${divider}${EOL}${skillBars}${EOL}`;
    },
  };

  return command;
};

