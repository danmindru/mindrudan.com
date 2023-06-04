import { stripIndents } from 'common-tags';
import { COMMAND_NAMES } from '../command-constants';
import { forcedChalk } from '../../utils/forcedChalk';

export const code = {
  name: COMMAND_NAMES.CODE,
  description: 'open vscode',
  run: () => {
    return forcedChalk.green(stripIndents`
      MS-DOS version 1.25
      Copyright 1981,82 Microsoft, Inc.

      The CDP Personal Computer DOS
      Version 2.11 Copyright Columbia Data Products, Inc. 1982, 1983
      Current date is Tue 1-01-1980
      Enter new date:
      Current time is 0:00:06.15
      Enter new time:

      C:\\>code
      'code' is not recognized as an internal or external command,
      operable program or batch file.

      Microsoft does not support open source software. Call Bill at 206-123-4567
    `);
  },
};
