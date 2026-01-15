import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';


export const curl = {
  name: 'curl',
  description: 'transfer data (pretend)',
  run: (args) => {
    const url = args._[0];

    if (!url) {
      return forcedChalk.red("curl: try 'curl --help' or 'curl wttr.in' for weather\n\n(Just kidding, neither works here)");
    }

    if (url.includes('wttr.in')) {
      return [
        forcedChalk.yellow('Weather Report (Imaginary):'),
        '',
        forcedChalk.cyan('    \\   /     Sunny with a chance of'),
        forcedChalk.cyan('     .-.      shipping code'),
        forcedChalk.cyan('  ‒ (   ) ‒   '),
        forcedChalk.cyan('     `-\'      Temperature: Perfect for coding'),
        forcedChalk.cyan('    /   \\     Wind: Blowing bugs away'),
      ].join(EOL);
    }

    if (url.includes('localhost')) {
      return forcedChalk.green('{"message": "Hello from fake localhost!", "status": "vibing", "coffee_level": "critical"}');
    }

    if (url.includes('api')) {
      return [
        forcedChalk.green('{'),
        forcedChalk.green('  "status": 200,'),
        forcedChalk.green('  "message": "This API is fake but supportive",'),
        forcedChalk.green('  "data": {'),
        forcedChalk.green('    "motivation": "You got this!",'),
        forcedChalk.green('    "bugs": 0,'),
        forcedChalk.green('    "features": "unlimited"'),
        forcedChalk.green('  }'),
        forcedChalk.green('}'),
      ].join(EOL);
    }

    return [
      forcedChalk.cyan(`Curling ${url}...`),
      '',
      forcedChalk.yellow('<!DOCTYPE html>'),
      forcedChalk.yellow('<html>'),
      forcedChalk.yellow('  <body>'),
      forcedChalk.yellow('    <h1>This is a fake response</h1>'),
      forcedChalk.yellow('    <p>The real internet is elsewhere.</p>'),
      forcedChalk.yellow('  </body>'),
      forcedChalk.yellow('</html>'),
    ].join(EOL);
  },
};

