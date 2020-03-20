import React, { useRef, useEffect, useState } from 'react';
import { css } from 'emotion';

import 'bashme/dist/xterm.css';
import * as Bashme from 'bashme';

import './App.css';
import { version } from '../package.json';

import { forcedChalk } from './utils/forcedChalk';

import { Menu } from './Menu';
import { renderCommand } from './utils/renderCommand';
import { EOL } from './commands/command-constants';
import { whoami } from './commands/whoami';
import { work } from './commands/work';
import { contact } from './commands/contact';
import { photo } from './commands/photo-ascii';
import { screensaver } from './commands/private/screensaver';

import { isDebugOn } from './utils/debug';
import { Clear } from './Clear';

const mainStyle = css`
  --terminal-padding: 16px;
  background-color: #444;
  position: relative;
  overflow: hidden;

  .terminal {
    width: calc(100vw - var(--terminal-padding) * 4);
    height: calc(100vh - var(--terminal-padding) * 2);
    padding: var(--terminal-padding) calc(var(--terminal-padding) * 2);

    .xterm-viewport {
      overflow-y: auto;
    }
  }
`;

const terminalStyle = css`
  transform-style: preserve-3d;
  transition: transform 0.5s;

  position: relative;
  left: 0;
  z-index: 1;
  height: 100vh;
  overflow: hidden;

  :after {
    content: '';
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    background-color: transparent;
    transition: background-color 1s, backdrop-filter 1s;
  }
`;

const terminalOpenStyle = css`
  transform: scale(0.8);
  transition: transform 0.5s;

  :after {
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 1s, backdrop-filter 1s;
    backdrop-filter: blur(1px);
  }
`;

const welcomeMessage = `\nWelcome to mindrudan.com v${version}  🎩 ✨ \nType man to see notes on usage.`; // TODO: "or man <command>"

const makeRunCommand = (bashmeInstance) => (commandName) => {
  if (commandName === 'clear') {
    return bashmeInstance.cli.clear();
  }

  bashmeInstance.cli.input(`${commandName}${EOL}${EOL}`);
  bashmeInstance.cli.processInput();
};

export const App = () => {
  const terminalDom = useRef(null);
  const [open, setOpen] = useState(false);
  const [bashmeInstance, setBashmeInstance] = useState(null);

  const onTerminalPress = () => {
    if (open) {
      setOpen(false);
    }
  };

  const clearActiveElement = () => {
    const activeElement = document.activeElement;
    if (activeElement) {
      activeElement.blur();
    }
  };

  useEffect(() => {
    const bashme = new Bashme.Bashme({
      prompt: forcedChalk.bold.gray('mindrudan.com $ '),
      welcomeMessage
    });

    const commands = [whoami(), contact(), photo(), work(bashme)];
    const customProvider = {
      getCommands: () => [
        {
          name: 'man',
          description: 'List available commands and their description.',
          run: (args) => {
            // TODO: render args for each command
            // if (Object.keys(args).length) {}

            const cmds = [
              forcedChalk.bgWhite.grey('Available commands:'),
              EOL,
              ...commands.map(renderCommand),
              EOL,
              'For more commands type `help`.',
              EOL
            ].join(EOL);

            if (isDebugOn()) {
              console.log('Commands', cmds);
            }

            return cmds;
          }
        },
        ...commands,
        screensaver
      ]
    };

    bashme.use(customProvider);
    bashme.use(new Bashme.GitHub('danmindru'));

    bashme.show(terminalDom.current);
    bashme.on('command', (cmd, args) => {
      if (isDebugOn()) {
        console.log(cmd, args);
      }
    });

    setBashmeInstance(bashme);
  }, []);

  useEffect(() => {
    // Make sure there is no focused element when the menu state changes.
    // This can cause keyboad shortcuts to function strangely, i.e. space pressed a button that is off-canvas.
    clearActiveElement();

    // Scroll to bottom
    const xtermViewport = document.querySelector('.xterm-viewport');
    if (xtermViewport) {
      xtermViewport.scrollTo(0, 999999);
    }
  }, [open]);

  return (
    <section className={mainStyle}>
      <main
        ref={terminalDom}
        className={[terminalStyle, open ? terminalOpenStyle : ''].join(' ')}
        onClick={onTerminalPress}
      />

      {bashmeInstance && (
        <Menu
          open={open}
          setOpen={setOpen}
          runCommand={makeRunCommand(bashmeInstance)}
        />
      )}

      <Clear
        menuOpen={open}
        runCommand={makeRunCommand(bashmeInstance)}
        bashme={bashmeInstance}
      />
    </section>
  );
};
