import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const hackingLines = [
  'Accessing mainframe...',
  'Bypassing firewall [████████░░] 80%',
  'Decrypting password: ************',
  'Injecting SQL: DROP TABLE students;--',
  'Downloading RAM...',
  'Hacking time: O(log n)... wait, O(n²)... oh no.',
  'Running brute force... feeling guilty about it.',
  'Cracking hash: 5f4dcc3b5aa765d61d8327deb882cf99',
  'Exploiting vulnerability: CVE-2024-YOLO',
  'Access granted to /dev/null',
  'Extracting cookies... delicious 🍪',
  'Uploading virus.exe.jpg.mp3.definitely-not-malware',
  'Reversing blockchain... wait, that\'s not how it works',
  'Initiating Gibson hack sequence...',
  'Hiding IP: 127.0.0.1 → 192.168.1.1 → localhost',
  'Bypassing 2FA by asking nicely...',
  'Overclocking CPU to 88 mph... great scott!',
  'SUCCESS: You\'re in! (just kidding, this is a website)',
];

export const hack = () => {
  const command = {
    name: COMMAND_NAMES.HACK,
    description: 'initiate hacking sequence',
    run: () => {
      const numLines = 5 + Math.floor(Math.random() * 5);
      const selectedLines = [];
      const shuffled = [...hackingLines].sort(() => Math.random() - 0.5);

      for (let i = 0; i < numLines; i++) {
        selectedLines.push(shuffled[i]);
      }

      const header = forcedChalk.green('🖥️  INITIATING HACK SEQUENCE...') + EOL;
      const lines = selectedLines
        .map((line) => forcedChalk.green(`> ${line}`))
        .join(EOL);
      const footer =
        EOL +
        forcedChalk.yellow('⚠️  Just kidding. This is a portfolio website.') +
        EOL;

      return header + EOL + lines + footer;
    },
  };

  return command;
};

