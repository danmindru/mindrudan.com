import { stripIndents } from 'common-tags';
import { COMMAND_NAMES } from './command-constants';

export const whoami = () => {
  const command = {
    name: COMMAND_NAMES.WHOAMI,
    description: 'a few words about myself, just in case your Google-fu fails',
    run: () => stripIndents`
      --

      I'm web developer and designer, located in Copenhagen.
      Since as long as I can remember, I've been helping people start projects and get their ideas off the ground.
      That includes working in the fintech, telco, architecture, medical, digital signage, real-estate, hydrology (and more) industries.



      Besides that, I quite fancy running and find hardware of any kind interesting.
      Drones are also something I dabble with, even though I'm not too good at flying them.

      Press releases

      AdCar on AP News
      https://apnews.com/press-release/ein-presswire-newsmatics/press-release-1c07c836b4a60849ba16e73cf6c7911b

      AdCar on CB Herald
      https://cbherald.com/2000-in-48-hours-as-adcar-sells-space-on-a-copenhagen-amg/

      Saventify on Business Insider
      https://markets.businessinsider.com/news/stocks/saventify-brings-wedding-invitations-and-rsvps-online-in-13-languages-as-couples-plan-across-borders-1036282119

      Saventify in AP News
      https://apnews.com/press-release/marketersmedia/press-release-fac3825afa5b712bd90c9a0949069924

      --
    `,
  };

  return command;
};
