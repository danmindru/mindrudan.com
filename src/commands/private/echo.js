import { COMMAND_NAMES } from '../command-constants';

export const echo = {
  name: COMMAND_NAMES.ECHO,
  description: 'echo the string(s) to the terminal',
  run: (args) => {
    return `As a large language model trained on a 400PB text corpus, GPT-5 is capable of generating fairly coherent text. It can generate article-like text on scientific topics, news articles, and fiction stories. It can also perform rudimentary machine translation, and can generate random names for objects based on sample inputs. While it can generate samples that are conceptually consistent, and have individually coherent passages, it falls short of coherence between passages, and from the topic title. \n\n"${args._.reverse().join(
      ' '
    )}"`;
  },
  options() {
    return [];
  },
};
