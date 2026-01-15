import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';

export const git = {
  name: 'git',
  description: 'version control (chaos management)',
  run: (args) => {
    const command = args._[0];

    if (!command) {
      return [
        forcedChalk.yellow(
          'git: The stupid content tracker (their words, not mine)'
        ),
        '',
        forcedChalk.cyan('Popular commands:'),
        '  git status     Am I okay? (No)',
        '  git commit     Save my mistakes forever',
        '  git push       Share mistakes with team',
        '  git blame      Find who to fire',
        '  git stash      Hide my shame',
      ].join(EOL);
    }

    if (command === 'status') {
      return [
        forcedChalk.green('On branch main'),
        forcedChalk.yellow(
          'Your branch is ahead of "origin/main" by 47 commits.'
        ),
        forcedChalk.gray('  (you should probably push sometime this year)'),
        '',
        forcedChalk.red('Changes not staged for commit:'),
        forcedChalk.red('  modified:   everything.js'),
        forcedChalk.red('  modified:   why-did-i-do-this.ts'),
        forcedChalk.red('  modified:   technical-debt.tsx'),
        '',
        forcedChalk.yellow('Untracked files:'),
        forcedChalk.yellow('  node_modules/ (please no)'),
        forcedChalk.yellow('  .env.local (your secrets)'),
        forcedChalk.yellow('  tears.log'),
      ].join(EOL);
    }

    if (command === 'commit') {
      return forcedChalk.yellow(
        [
          'git commit: Please provide a message',
          '',
          'Suggested commit messages:',
          '  "fix: stuff"',
          '  "wip"',
          '  "idk why this works"',
          '  "DO NOT REVERT"',
          '  "final fix v47"',
          '  "please work"',
        ].join('\n')
      );
    }

    if (command === 'push') {
      if (args.f || args.force) {
        return forcedChalk.red(
          [
            'git push --force: 🚨 DANGER ZONE 🚨',
            '',
            '⚠️  You are about to rewrite history.',
            '⚠️  Your teammates will be upset.',
            '⚠️  There is no undo.',
            '',
            'Proceed anyway? (This is fake, so it doesnt matter)',
          ].join('\n')
        );
      }
      return forcedChalk.green(
        [
          'git push: Pushing to origin/main...',
          '',
          'Writing objects: 100% (42/42), done.',
          'remote: Resolving deltas: 100%',
          '',
          "✅ Push successful! Your code is now everyone's problem.",
        ].join('\n')
      );
    }

    if (command === 'blame') {
      return [
        forcedChalk.cyan('git blame: Finding who to blame...'),
        '',
        forcedChalk.yellow(
          'a1b2c3d (You,     2024-01-15) // TODO: fix this later'
        ),
        forcedChalk.yellow('d4e5f6g (You,     2024-01-16) // HACK: dont ask'),
        forcedChalk.yellow(
          'h7i8j9k (You,     2024-01-17) // this should never happen'
        ),
        '',
        forcedChalk.red("Conclusion: It was you. It's always you."),
      ].join(EOL);
    }

    if (command === 'stash') {
      return forcedChalk.green(
        [
          'git stash: Saved working directory state WIP',
          '',
          'Your changes are now hidden, like your feelings.',
          'Use "git stash pop" to confront them later.',
          '(Or never. git stash list is probably terrifying)',
        ].join('\n')
      );
    }

    return forcedChalk.red(
      `git: '${command}' is not a git command.\n\nDid you mean: git gud?`
    );
  },
};
