import { COMMAND_NAMES, EOL } from './command-constants';
import { forcedChalk } from '../utils/forcedChalk';

const pizzaArt = `
          _....._
        _.:'.---.'.:.._
       .'.'   .- ° '.'.'.
      .' .' °    .-   '.'.
     .' .'  .-  ° .-.   '.'.
    .' .'  °  .-. °      '.'.
   .' .'   .-.  ° .-.  °   '.'.
  '..'____________________________'..'
`;

const pizzaFacts = [
  "Pizza is basically a real-time pie chart of how much pizza I've eaten.",
  "I like my code like my pizza: well-tested and delivered hot.",
  "Pizza: the reason I learned to code (to afford more pizza).",
  "There's no 'we' in pizza. Oh wait, yes there is. Let's share.",
  "My code has fewer bugs than pineapple on pizza has supporters.",
  "Pizza is just an open-faced sandwich with commitment issues.",
  "I ship code faster than pizza gets cold.",
  "Debug with pizza. Ship with purpose.",
  "In pizza we crust 🍕",
  "A slice a day keeps the burnout away.",
];

export const pizza = () => {
  const command = {
    name: COMMAND_NAMES.PIZZA,
    description: '🍕 my favorite food',
    run: () => {
      const fact = pizzaFacts[Math.floor(Math.random() * pizzaFacts.length)];
      const art = forcedChalk.yellow(pizzaArt);
      const text = forcedChalk.gray(`"${fact}"`);

      return `${art}${EOL}${text}${EOL}`;
    },
  };

  return command;
};

