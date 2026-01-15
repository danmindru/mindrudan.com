import { forcedChalk } from '../../../utils/forcedChalk';
import { EOL } from '../../command-constants';


export const ping = {
  name: 'ping',
  description: 'ping hosts (emotionally)',
  run: (args) => {
    const host = args._[0];

    if (!host) {
      return forcedChalk.red("ping: usage error: Destination address required\n\nPing who? Your ex? Don't do that.");
    }

    if (host === 'localhost' || host === '127.0.0.1') {
      return [
        forcedChalk.cyan(`PING ${host}: Pinging yourself? That's called introspection.`),
        '',
        forcedChalk.green('64 bytes from localhost: Self-esteem check... OK'),
        forcedChalk.green('64 bytes from localhost: Imposter syndrome... Present'),
        forcedChalk.green('64 bytes from localhost: Coffee levels... Critical'),
        forcedChalk.green('64 bytes from localhost: Motivation... Fluctuating'),
      ].join(EOL);
    }

    if (host === 'google.com') {
      return [
        forcedChalk.cyan(`PING google.com: Google is probably fine.`),
        '',
        forcedChalk.green('64 bytes: time=1ms (they have good servers)'),
        forcedChalk.green('64 bytes: time=1ms (seriously, very good)'),
        forcedChalk.green('64 bytes: time=1ms (you could never afford this)'),
        '',
        forcedChalk.yellow('--- ping statistics ---'),
        forcedChalk.yellow('3 packets transmitted, 3 received, 0% packet loss'),
        forcedChalk.yellow("Google doesn't even notice your ping. You're just a number to them."),
      ].join(EOL);
    }

    const times = [
      Math.floor(Math.random() * 50) + 10,
      Math.floor(Math.random() * 50) + 10,
      Math.floor(Math.random() * 50) + 10,
      Math.floor(Math.random() * 50) + 10,
    ];

    return [
      forcedChalk.cyan(`PING ${host} (fake.ip.addr): 56 data bytes`),
      '',
      ...times.map(t => forcedChalk.green(`64 bytes from ${host}: icmp_seq=1 ttl=64 time=${t}ms`)),
      '',
      forcedChalk.yellow(`--- ${host} ping statistics ---`),
      forcedChalk.yellow(`4 packets transmitted, 4 received, 0% packet loss`),
      forcedChalk.gray('(This ping was purely theatrical)'),
    ].join(EOL);
  },
};

