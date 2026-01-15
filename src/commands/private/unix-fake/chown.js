import { forcedChalk } from '../../../utils/forcedChalk';

export const chown = {
  name: 'chown',
  description: 'change file owner (communism simulator)',
  run: (args) => {
    const owner = args._[0];

    if (!owner) {
      return forcedChalk.red("chown: missing operand\nWho's the new owner? Elon? Zuck? You?");
    }

    if (owner === 'me') {
      return forcedChalk.green("chown me: Everything is yours now! 👑 (in your dreams)");
    }

    if (owner === 'root') {
      return forcedChalk.red([
        "chown root: Access denied.",
        "",
        "Root said: 'I own everything already. Nice try though.'",
      ].join('\n'));
    }

    if (owner === 'nobody') {
      return forcedChalk.yellow("chown nobody: File is now owned by nobody. It's having an existential crisis.");
    }

    return forcedChalk.green([
      `chown: Ownership transferred to '${owner}'`,
      "",
      "The file's previous owner is crying softly in the corner.",
      "Please be a responsible file owner. 📁",
    ].join('\n'));
  },
};

