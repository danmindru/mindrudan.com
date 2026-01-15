import { COMMAND_NAMES, EOL } from './command-constants';
import { HelpTopic } from 'bashme/dist/helpTopic';
import { forcedChalk } from '../utils/forcedChalk';

const projects = [
  {
    emoji: '🤖',
    url: 'https://pageai.pro',
    desc: 'AI website builder from a single prompt',
  },
  {
    emoji: '🚀',
    url: 'https://shipixen.com',
    desc: 'Generate Next.js boilerplates in minutes',
  },
  {
    emoji: '📄',
    url: 'https://pageui.dev',
    desc: 'Landing page components for React',
  },
  {
    emoji: '🏏',
    url: 'https://clobbr.app',
    desc: 'API load & speed testing tool',
  },
  {
    emoji: '⌚️',
    url: 'https://crontap.com',
    desc: 'Schedule recurring API calls',
  },
  {
    emoji: '🐈',
    url: 'https://hunted.space',
    desc: 'Product Hunt launch tracker',
  },
  {
    emoji: '🎙️',
    url: 'https://morningmakershow.com',
    desc: 'YouTube/Podcast for indie makers',
  },
  {
    emoji: '🎁',
    url: 'https://rarebigdeal.com',
    desc: 'Deals for SaaS & AI tools',
  },
  {
    emoji: '👾',
    url: 'https://mrrartpro.com',
    desc: 'Generate ASCII charts',
  },
  {
    emoji: '🖼️',
    url: 'https://imgxai.com',
    desc: 'Minimalist GPT image editor',
  },
  { emoji: '🫎', url: 'https://spamoose.com', desc: 'Email spam checker tool' },
  {
    emoji: '⌛️',
    url: 'https://crontool.cc',
    desc: 'Cron expression generator',
  },
  {
    emoji: '📀',
    url: 'https://apihustle.com',
    desc: 'Suite of API developer tools',
  },
];

const formatProject = ({ emoji, url, desc }) => {
  const link = forcedChalk.bold.cyanBright(url.padEnd(30));
  const description = forcedChalk.gray(desc);
  return `${emoji}  ${link} ${description}`;
};

export const startups = () => {
  const command = {
    name: COMMAND_NAMES.STARTUPS,
    description: `things I'm shipping on the internet`,
    run: () => {
      const header = forcedChalk.yellow('My startups, apps and products') + EOL;
      const divider = forcedChalk.gray('─'.repeat(50)) + EOL;
      const projectList = projects.map(formatProject).join(EOL);

      return [header, divider, projectList, EOL].join(EOL);
    },
  };

  const helpTopic = new HelpTopic(command, {
    synopsis: COMMAND_NAMES.STARTUPS,
    examples: [
      {
        cmd: COMMAND_NAMES.STARTUPS,
        description: 'Show all startups and projects I am shipping',
      },
    ],
  });

  return {
    ...command,
    helpTopic,
  };
};
