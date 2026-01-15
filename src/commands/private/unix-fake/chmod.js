import { forcedChalk } from '../../../utils/forcedChalk';

export const chmod = {
  name: 'chmod',
  description: 'change file permissions (yeah right)',
  run: (args) => {
    const mode = args._[0];

    if (!mode) {
      return forcedChalk.red("chmod: missing operand\nTry 'chmod 777 everything' (just kidding, please don't)");
    }

    if (mode === '777') {
      return forcedChalk.red([
        "chmod 777: 🚨 SECURITY ALERT 🚨",
        "",
        "Did you just try to give everyone access to everything?",
        "This is why we can't have nice things.",
        "",
        "Your DevOps team felt a disturbance in the Force.",
      ].join('\n'));
    }

    if (mode === '000') {
      return forcedChalk.yellow("chmod 000: File is now in witness protection. Nobody can access it, including you.");
    }

    if (mode === '420') {
      return forcedChalk.green("chmod 420: Nice. 😎");
    }

    if (mode === '666') {
      return forcedChalk.red("chmod 666: The file is now possessed. 👹 Consult your nearest sysadmin.");
    }

    return forcedChalk.green(`chmod: Permissions changed to ${mode}! (not really, this is a website)`);
  },
};

