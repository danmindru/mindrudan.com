import { stripIndents } from 'common-tags';
import { COMMAND_NAMES } from './command-constants';

export const whoami = () => {
  const command = {
    name: COMMAND_NAMES.WHOAMI,
    description: 'a few words about myself, just in case your Google-fu fails',
    run: () => stripIndents`
      --

      I'm web developer and designer, located in Copenhagen.
      Since as long as I can remember, I've been helping people start projects and get their ideas on the road.
      That includes working in the fintech, telco, architecture, medical, digital signage, real-estate, hydrology (and more) industries.



      Besides that, I quite fancy running and find hardware of any kind interesting.
      Drones are also something I dabble with, even though I'm not too good at flying them.

      --
    `,
  };

  return command;
};
