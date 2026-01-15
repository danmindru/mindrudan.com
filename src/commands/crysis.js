import { COMMAND_NAMES } from './command-constants';
import { HelpTopic } from 'bashme/dist/helpTopic';
import { setupThreeGlitch } from '../3d/glitch';
import { kernelPanics } from '../panics/panics';
import { renderKernelPanic } from '../panics/renderPanic';

export const crysis = (bashme) => {
  const command = {
    name: COMMAND_NAMES.CRYSIS,
    description: `but can you run Crysis?`,
    run: () => {
      setTimeout(setupThreeGlitch, 2000);

      // TODO implement cryengine
      return renderKernelPanic(
        [
          'Booting up CryEngine...',
          'Setting up Ray Tracing...',
          'Setting to 8k lossless mode...',
          'Loading assets...',
          'Initializing physics engine...',
          'Loading textures...',
          'Loading shaders...',
          'Loading sound effects...',
          'Loading music...',
          'Loading UI...',
          'Loading particles...',
          '',
          ...kernelPanics[Math.floor(Math.random() * kernelPanics.length)],
        ],
        bashme
      );
    },
    options: () => ['-y'], // todo
  };

  const helpTopic = new HelpTopic(command, {
    synopsis: COMMAND_NAMES.CRYSIS,
    options: {
      '-8k': 'Run in 8k mode with no AI upscaling',
    },
    examples: [
      {
        cmd: `${COMMAND_NAMES.CRYSIS} -8k`,
        description: 'This command will run Crysis. Probably.',
      },
    ],
  });

  return {
    ...command,
    helpTopic,
  };
};
