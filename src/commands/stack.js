import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const techStack = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['Node.js', 'Express', 'tRPC', 'Prisma', 'PostgreSQL'],
  'Tools': ['VS Code', 'Cursor', 'Figma', 'Git', 'GitHub Actions'],
  'Hosting': ['Vercel', 'Railway', 'Cloudflare', 'AWS'],
  'Favorites': ['Bun', 'Turborepo', 'shadcn/ui', 'Zustand'],
};

export const stack = () => {
  const command = {
    name: COMMAND_NAMES.STACK,
    description: 'see my tech stack',
    run: () => {
      const header = forcedChalk.yellow('🛠️  Tech Stack') + EOL;
      const divider = forcedChalk.gray('─'.repeat(50)) + EOL;

      const stackOutput = Object.entries(techStack)
        .map(([category, items]) => {
          const categoryLabel = forcedChalk.cyan(`${category}:`);
          const itemsList = items
            .map((item) => forcedChalk.white(item))
            .join(forcedChalk.gray(' • '));
          return `${categoryLabel}${EOL}  ${itemsList}`;
        })
        .join(EOL + EOL);

      return `${EOL}${header}${divider}${EOL}${stackOutput}${EOL}`;
    },
  };

  return command;
};

