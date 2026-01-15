import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';


export const wget = {
  name: 'wget',
  description: 'download files (hypothetically)',
  run: (args) => {
    const url = args._[0];

    if (!url) {
      return forcedChalk.red("wget: missing URL\nUsage: wget [URL]\n\nWhat do you want to download? More frameworks?");
    }

    const filename = url.split('/').pop() || 'index.html';
    const size = Math.floor(Math.random() * 1000) + 'KB';

    return [
      forcedChalk.cyan(`--${new Date().toISOString()}--  ${url}`),
      forcedChalk.gray(`Resolving ${url.split('/')[2] || 'somewhere'}... done.`),
      forcedChalk.gray('Connecting... connected.'),
      forcedChalk.gray('HTTP request sent, awaiting response... 200 OK'),
      forcedChalk.gray(`Length: ${size} [text/html]`),
      forcedChalk.gray(`Saving to: '${filename}'`),
      '',
      forcedChalk.green('███████████████████████████████████ 100%'),
      '',
      forcedChalk.yellow(`'${filename}' saved [${size}]`),
      '',
      forcedChalk.gray('(File saved to /dev/imagination)'),
      forcedChalk.gray('(No actual downloading occurred in this simulation)'),
    ].join(EOL);
  },
};

