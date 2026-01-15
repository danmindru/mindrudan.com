import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const weatherConditions = [
  {
    emoji: '☀️',
    condition: 'Sunny with a chance of shipping',
    temp: '23°C',
    description: 'Perfect weather for deploying to production.',
  },
  {
    emoji: '🌤️',
    condition: 'Partly cloudy, mostly productive',
    temp: '19°C',
    description: 'Light cloud coverage over the CI/CD pipeline.',
  },
  {
    emoji: '🚀',
    condition: 'Launch weather detected',
    temp: '25°C',
    description: 'Ideal conditions for shipping features.',
  },
  {
    emoji: '☕',
    condition: 'Caffeinated with light coding',
    temp: '21°C',
    description: 'High pressure system of productivity incoming.',
  },
  {
    emoji: '⭐',
    condition: 'Clear skies, zero bugs',
    temp: '22°C',
    description: 'Rare phenomenon. Enjoy it while it lasts.',
  },
];

const sunArt = `
    \\   |   /
      .---.
   -- |   | --
      '---'
    /   |   \\
`;

export const weather = () => {
  const command = {
    name: COMMAND_NAMES.WEATHER,
    description: 'check the shipping forecast',
    run: () => {
      const forecast =
        weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      const art = forcedChalk.yellow(sunArt);

      const info = [
        `${forcedChalk.cyan('Location:')}    ${forcedChalk.white('Copenhagen, DK')}`,
        `${forcedChalk.cyan('Condition:')}   ${forecast.emoji} ${forcedChalk.white(forecast.condition)}`,
        `${forcedChalk.cyan('Temperature:')} ${forcedChalk.white(forecast.temp)}`,
        `${forcedChalk.cyan('Forecast:')}    ${forcedChalk.gray(forecast.description)}`,
      ].join(EOL);

      return `${art}${EOL}${info}${EOL}`;
    },
  };

  return command;
};

