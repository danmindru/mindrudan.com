import { forcedChalk } from '../utils/forcedChalk';

export const renderCommand = ({ name, description }) =>
  `${forcedChalk.bold(name.padStart(10).padEnd(13))} ${description}`;
