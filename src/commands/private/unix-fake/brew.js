import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';


const packages = [
  { name: 'motivation', desc: 'Daily dose of getting things done' },
  { name: 'coffee', desc: 'Essential developer fuel (v∞.0.0)' },
  { name: 'patience', desc: 'Required for npm install' },
  { name: 'sanity', desc: 'Lost during debugging sessions' },
  { name: 'sleep', desc: 'Optional package (rarely installed)' },
  { name: 'success', desc: 'Requires: hard-work, coffee, luck' },
];

export const brew = {
  name: 'brew',
  description: 'Homebrew package manager (parody)',
  run: (args) => {
    const command = args._[0];
    const pkg = args._[1];

    if (!command) {
      return [
        forcedChalk.yellow('🍺 Homebrew (Fake Edition)'),
        '',
        forcedChalk.cyan('Commands:'),
        '  brew install <package>  Install a fictional package',
        '  brew search <query>     Search for imaginary packages',
        '  brew list               List installed delusions',
        '  brew update             Update your expectations',
      ].join(EOL);
    }

    if (command === 'install') {
      if (!pkg) return forcedChalk.red('brew: No package specified. Try "brew install happiness"');

      if (pkg === 'success') {
        return forcedChalk.yellow([
          '🍺 Installing success...',
          '',
          'Error: This package has unmet dependencies:',
          '  - hard-work (not found)',
          '  - persistence (version mismatch)',
          '  - luck (optional but recommended)',
          '',
          'Try: brew install hard-work && brew install success',
        ].join('\n'));
      }

      return [
        forcedChalk.green(`🍺 Installing ${pkg}...`),
        forcedChalk.gray('==> Downloading from imagination.dev...'),
        forcedChalk.gray('==> Pouring feels...'),
        forcedChalk.green(`✅ ${pkg} installed successfully!`),
        '',
        forcedChalk.gray('(Package exists only in your mind)'),
      ].join(EOL);
    }

    if (command === 'list') {
      return [
        forcedChalk.yellow('🍺 Installed packages:'),
        '',
        ...packages.map(p => `  ${forcedChalk.green(p.name.padEnd(15))} ${forcedChalk.gray(p.desc)}`),
      ].join(EOL);
    }

    if (command === 'update') {
      return [
        forcedChalk.yellow('🍺 Updating Homebrew...'),
        '',
        forcedChalk.gray('Updated 0 taps (they were already perfect)'),
        forcedChalk.gray('Updated 0 formulae (imagination is up to date)'),
        '',
        forcedChalk.green('Already up-to-date. Just like you! ✨'),
      ].join(EOL);
    }

    return forcedChalk.red(`brew: Unknown command '${command}'`);
  },
};

