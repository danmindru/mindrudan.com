import { COMMAND_NAMES } from './command-constants';
import { HelpTopic } from 'bashme/dist/helpTopic';
import { setupThreeGlitch } from '../3d/glitch';
import { kernelPanics } from '../panics/panics';
import { renderKernelPanic } from '../panics/renderPanic';

export const work = (bashme) => {
  const command = {
    name: COMMAND_NAMES.WORK,
    description: `what I contributed to over the years`,
    run: () => {
      setTimeout(setupThreeGlitch, 2000);

      // TODO
      return renderKernelPanic(
        kernelPanics[Math.floor(Math.random() * kernelPanics.length)],
        bashme
      );
    },
    options: () => ['-y'], // todo
  };

  const helpTopic = new HelpTopic(command, {
    synopsis: COMMAND_NAMES.WORK,
    options: {
      '-y': 'Filter work by year',
    },
    examples: [
      {
        cmd: `${COMMAND_NAMES.WORK} -y 2020`,
        description:
          'This command can show work and filter it by provided options',
      },
    ],
  });

  return {
    ...command,
    helpTopic,
  };
};
