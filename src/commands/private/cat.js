import { stripIndents } from 'common-tags';
import { COMMAND_NAMES } from '../command-constants';
import { files, hiddenFiles } from './ls';
import { setupThreeGlitch } from '../../3d/glitch';
import { renderKernelPanic } from '../../panics/renderPanic';
import { kernelPanics } from '../../panics/panics';

const acceptedFiles = [...files, ...hiddenFiles];

export const cat = (
  bashme,
  commandName = COMMAND_NAMES.CAT,
  commandDesc = 'concatenate files and print on the standard output'
) => {
  const command = {
    name: commandName,
    description: commandDesc,
    run: async (args) => {
      if (!args._?.length) {
        return stripIndents`
          missing operand
        `;
      }

      if (args._[0] === 'node_modules') {
        return stripIndents`
          [bat error]: 'node_modules' is a directory.
        `;
      }

      switch (args._[0]) {
        case '.secrets.txt': {
          if (!args.password) {
            return stripIndents`
              cat: .secrets.txt: Permission denied
              Use --password to bypass encryption
              Hint: twitter
            `;
          }

          if (args.password !== 'd4m1n') {
            return stripIndents`
              cat: .secrets.txt: Permission denied
              Wrong password
            `;
          }

          const file = await import('./assets/secrets.js');
          return file.secrets;
        }

        case 'index.php': {
          const file = await import('./assets/php.js');
          return file.php;
        }

        case 'index.html': {
          const file = await import('./assets/html.js');
          return file.html;
        }

        case 'jquery.min.js': {
          setTimeout(setupThreeGlitch, 2000);

          renderKernelPanic(
            kernelPanics[Math.floor(Math.random() * kernelPanics.length)],
            bashme
          );

          const file = await import('./assets/jquery.js');
          return file.jquery;
        }

        case 'todo.js': {
          const file = await import('./assets/todo.js');
          return file.todo;
        }

        case 'todo.css': {
          const file = await import('./assets/todoCss.js');
          return file.todoCss;
        }

        default:
          return stripIndents`
            cat: ${args._[0]}: No such file or directory
          `;
      }
    },

    options: () => [...acceptedFiles, '--password'],
  };

  return command;
};
