import { EOL } from 'os';

const exitVim = (bashme) => {
  setTimeout(() => {
    bashme.cli.write(EOL);
    bashme.cli.write(':wq');
    bashme.cli.write(EOL);
    bashme.cli.prompt();

    exitVim(bashme);
  }, 2000);
};

export const vi = (bashme) => {
  return {
    name: 'vi',
    description: `one purely does not exit`,
    run: () => {
      exitVim(bashme);
      return 'why';
    },
  };
};
