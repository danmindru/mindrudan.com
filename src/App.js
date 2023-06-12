import React, { useRef, useEffect, useState } from 'react';
import { css } from 'emotion';

import 'bashme/dist/xterm.css';
import * as Bashme from 'bashme';

import './App.css';
import { version } from '../package.json';

import { forcedChalk } from './utils/forcedChalk';

import { Menu } from './Menu';
import { isDebugOn } from './utils/debug';
import { Clear } from './Clear';
import { renderCommand } from './utils/renderCommand';
import { COMMAND_NAMES, EOL } from './commands/command-constants';
import { whoami } from './commands/whoami';
import { work } from './commands/work';
import { contact } from './commands/contact';
import { photo } from './commands/photo-ascii';
import { vinyl } from './commands/vinyl-ascii';
import { music } from './commands/music-ascii';
import { twitter } from './commands/twitter';

import { screensaver } from './commands/private/screensaver';
import { alex } from './commands/private/alex';
import { fuck } from './commands/private/fuck';
import { noWay } from './commands/private/no-way';
import { ls } from './commands/private/ls';
import { cat } from './commands/private/cat';
import { nano } from './commands/private/nano';
import { vi } from './commands/private/vi';
import { viExit } from './commands/private/viExit';
import { rm } from './commands/private/rm';
import { code } from './commands/private/code';
import { pwd } from './commands/private/pwd';
import { echo } from './commands/private/echo';
import { luc } from './commands/private/luc';

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

const spotifyStyle = css`
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 2;
  width: 320px;
  height: 152px;
`;

const welcomeMessage = forcedChalk.yellow(
  `\nWelcome to mindrudan.com ${forcedChalk.bold(
    `v${version}`
  )}  🎩 ✨ \nType ${forcedChalk.bold('man')} to see notes on usage.`
); // TODO: "or man <command>"

const makeRunCommand = (bashmeInstance) => (commandName) => {
  if (commandName === 'clear') {
    return bashmeInstance.cli.clear();
  }

  bashmeInstance.cli.input(`${commandName}${EOL}${EOL}`);
  bashmeInstance.cli.processInput();
};

const reverseString = (str) => {
  if (str === '') return '';
  else return reverseString(str.substr(1)) + str.charAt(0);
};

const P1 = '54nptB866SxZM8U45RfLFZ';
const P2 = '0D8PQH1wULVuYV6bQZedEc';
const P3 = '3BNneHSpDUEp5xs5l0NCKm';

export const App = () => {
  const terminalDom = useRef(null);
  const [open, setOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState(P1);
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

  const playMusic = () => {
    if (!document.getElementById('spotify-iframe-api')) {
      const script = document.createElement('script');
      script.src = 'https://open.spotify.com/embed-podcast/iframe-api/v1';
      script.async = true;
      script.id = 'spotify-iframe-api';
      document.body.appendChild(script);
    }

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        height: 152,
        uri: `spotify:playlist:${window.playlistUrl}`,
      };

      const callback = (EmbedController) => {
        console.log('EmbedController', EmbedController);
        window.spotifyEmbedController = EmbedController;
        EmbedController.play();

        // EmbedController.addListener('playback_update', (e) => {
        //   if (e && e.data.isPaused && musicPlaying === true) {
        //     setMusicPlaying(false);
        //   }

        //   if (e && !e.data.isPaused && musicPlaying === false) {
        //     setMusicPlaying(true);
        //   }
        // });
      };

      IFrameAPI.createController(element, options, callback);
    };

    if (window.spotifyEmbedController) {
      window.spotifyEmbedController.loadUri(
        `spotify:playlist:${window.playlistUrl}`
      );
      window.spotifyEmbedController.play();
    }

    setMusicPlaying(true);
  };

  const pauseMusic = () => {
    if (window.spotifyEmbedController) {
      window.spotifyEmbedController.destroy();
      setMusicPlaying(false);
    }
  };

  useEffect(() => {
    window.playlistUrl = playlistUrl;
  }, [playlistUrl]);

  useEffect(() => {
    const bashme = new Bashme.Bashme({
      prompt: forcedChalk.bold.gray('mindrudan.com $ '),
      welcomeMessage,
    });

    const commands = [
      whoami(),
      contact(),
      photo(),
      work(bashme),
      twitter(),
      {
        name: 'menu',
        description: 'open the menu.',
        run: () => {
          setOpen(true);
          return '';
        },
      },
    ];

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
              EOL,
            ].join(EOL);

            if (isDebugOn()) {
              console.log('Commands', cmds);
            }

            return cmds;
          },
        },

        ...commands,
        screensaver,
        alex,
        luc,
        fuck,
        noWay,
        rm,
        code,
        pwd,
        echo,
        ls(bashme),
        cat(bashme),
        nano(bashme, COMMAND_NAMES.NANO),
        vi(bashme),
        viExit,
        {
          ...vinyl,
          run: () => {
            setPlaylistUrl(P2);
            playMusic();
            return vinyl.run();
          },
        },
        {
          ...music,
          run: () => {
            setPlaylistUrl(P3);
            playMusic();
            return music.run();
          },
        },
        {
          name: 'favorite',
          description: 'There are many',
          run: (args) => {
            if (args._?.includes('vinyl')) {
              setPlaylistUrl(P1);
              playMusic();
              return reverseString(vinyl.run());
            }
          },
          options: ['vinyl'],
        },
        {
          name: 'novinyl',
          description: `No more.`,
          run: () => {
            pauseMusic();
            return '😟';
          },
        },
      ],
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

      <div
        className={spotifyStyle}
        style={{
          display: musicPlaying ? 'block' : 'none',
        }}
      >
        <div id="embed-iframe"></div>
      </div>
    </section>
  );
};
