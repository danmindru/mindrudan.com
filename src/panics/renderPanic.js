import { EOL } from '../commands/command-constants';

export const renderKernelPanic = (kernelPanic, bashmeInstance) =>
  kernelPanic
    .reduce(
      (acc, cur) =>
        acc.then(
          () =>
            new Promise((resolve) =>
              setTimeout(
                () => resolve(bashmeInstance.cli.write(cur + EOL)),
                Math.random() * 200 + 50
              )
            )
        ),
      Promise.resolve(bashmeInstance.cli.write(EOL))
    )
    .then(() => {
      bashmeInstance.cli.prompt();
    });
