import { stripIndents } from 'common-tags';
import { COMMAND_NAMES } from '../command-constants';

export const files = [
  'index.php',
  'index.html',
  'jquery.min.js',
  'node_modules',
  'todo.js',
  'todo.css',
];

export const hiddenFiles = ['.secrets.txt'];

export const ls = () => {
  const command = {
    name: COMMAND_NAMES.LS,
    description: 'list files and directories',
    run: async (args) => {
      const filelist = args.a ? [...hiddenFiles, ...files] : files;

      if (args._[0] === 'node_modules') {
        const file = await import('./assets/node_modules.js');
        return file.nodeModules;
      }

      if (args._[0]) {
        return stripIndents`
          ls: cannot access '${args._[0]}': No such file or directory
        `;
      }

      if (args.l) {
        return stripIndents`
          total ${filelist.length}
          drwxr-xr-x  2 root root 4096 ${new Date().toDateString()} .
          drwxr-xr-x 22 root root 4096 ${new Date().toDateString()} ..
          ${filelist
            .map(
              (file) =>
                `drwxr-xr-x  2 root root ${Math.round(Math.random() * 1000)
                  .toString()
                  .padEnd(4, ' ')} ${new Date().toDateString()} ${file}`
            )
            .join('\n')}
        `;
      }

      return stripIndents`
        ${filelist.join('  ')}
      `;
    },

    options: () => ['-a', '-l', '-h'],
  };

  return command;
};
