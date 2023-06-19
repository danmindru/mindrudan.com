import React, { useRef, useEffect, useState, useCallback } from 'react';
import { css } from 'emotion';
import { useMediaQuery } from 'react-responsive';
import { isAndroid } from 'react-device-detect';

import 'bashme/dist/xterm.css';
import * as Bashme from 'bashme';
import { fit } from 'xterm/lib/addons/fit/fit';

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

  background-color: var(--terminal-bg);
  position: relative;
  display: flex;
  flex-direction: column;

  .terminal {
    width: calc(100vw - var(--terminal-padding) * 4);
    height: calc(
      100vh - var(--terminal-padding) * 2 - var(--page-margin-bottom)
    );
    padding: var(--terminal-padding) calc(var(--terminal-padding) * 2);

    .xterm-viewport {
      overflow-y: auto;
      width: 100%;
    }
  }

  .xterm .xterm-viewport {
    background-color: var(--terminal-bg);
  }

  footer {
    position: relative;
    z-index: 3;
    background-color: var(--terminal-bg);
    height: var(--page-margin-bottom);
    width: 100%;
  }
`;

const terminalStyle = css`
  transform-style: preserve-3d;
  transition: transform 0.5s;

  position: relative;
  left: 0;
  z-index: 1;
  height: 100%;
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
  bottom: var(--page-margin-bottom);
  right: 16px;
  z-index: 2;
  width: 320px;
  height: 152px;
  transition: all 0.5s;
  transform: translateX(0);
  opacity: 1;
  z-index: 3;

  @media (min-width: 768px) {
    bottom: 16px;
  }
`;

const spotifyStyleHidden = css`
  transform: translateY(100px);
  opacity: 0;
`;

const spotifyStyleMenuOpen = css`
  transform: translateX(-220px);
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
  const isLargeish = useMediaQuery({
    query: `(min-width: 768px)`,
  });
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

  const updateTheme = useCallback(
    (bashme, options = {}) => {
      const terminal = bashme.cli.terminal || bashmeInstance.cli.terminal;

      const bgColor = getComputedStyle(document.body).getPropertyValue(
        '--terminal-bg'
      );

      terminal.setOption('theme', {
        convertEol: true,
        cursorBlink: true,
        cursorStyle: 'underline',
        fontFamily:
          'Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
        fontSize: 12,
        background: bgColor,
        ...options,
      });

      if (options.fontSize) {
        terminal.setOption('fontSize', options.fontSize);
        fit(terminal);
      }
    },
    [bashmeInstance]
  );

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

  const onFooterClick = (e) => {
    e.preventDefault();

    const xtermViewport = document.querySelector('.xterm-viewport');
    xtermViewport.scrollTo(0, 999999);
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

    bashme.use(new Bashme.GitHub('danmindru'));

    const customProvider = {
      getCommands: () => [
        {
          name: 'man',
          description: 'list available commands and their description',
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
        nano(
          bashme,
          COMMAND_NAMES.NANO,
          'simple text editor in the style of the Alpine Composer'
        ),
        vi(bashme),
        {
          ...vinyl,
          run: () => {
            setPlaylistUrl(P2);
            playMusic();
            return vinyl.run();
          },
        },
        {
          name: 'novinyl',
          description: `no more`,
          run: () => {
            pauseMusic();
            return '😟';
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
          description: 'there are many',
          run: (args) => {
            if (args._?.includes('vinyl')) {
              setPlaylistUrl(P1);
              playMusic();
              return reverseString(vinyl.run());
            }
          },
          options: ['vinyl'],
        },

        viExit,
      ],
    };

    bashme.use(customProvider);

    bashme.show(terminalDom.current);
    bashme.on('command', (cmd, args) => {
      if (isDebugOn()) {
        console.log(cmd, args);
      }
    });

    if (isAndroid) {
      // HACK: Android does not fire keydown events for the terminal. Using onData instead. The proper fix could possibly be to use onData in the cli class instead and handle it that way for all devices.
      bashme.cli.terminal.onData(async (data) => {
        if (data.trim().length > 0) {
          await bashme.cli.input(data);
        }
      });
    }

    setBashmeInstance(bashme);
    updateTheme(bashme);
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

  useEffect(() => {
    if (!bashmeInstance) {
      return;
    }

    if (isLargeish) {
      updateTheme(bashmeInstance, {
        fontSize: 12,
      });
    } else {
      updateTheme(bashmeInstance, {
        fontSize: 9.5,
      });
    }
  }, [isLargeish, updateTheme, bashmeInstance]);

  return (
    <>
      <section className={mainStyle}>
        <main
          ref={terminalDom}
          className={[terminalStyle, open ? terminalOpenStyle : ''].join(' ')}
          onClick={onTerminalPress}
        />

        <Clear
          menuOpen={open}
          runCommand={makeRunCommand(bashmeInstance)}
          bashme={bashmeInstance}
        />

        <footer onClick={onFooterClick}></footer>
      </section>

      <div
        className={[
          musicPlaying
            ? spotifyStyle
            : [spotifyStyle, spotifyStyleHidden].join(' '),
          open ? spotifyStyleMenuOpen : '',
        ].join(' ')}
      >
        <div id="embed-iframe"></div>
      </div>

      {bashmeInstance && (
        <Menu
          open={open}
          setOpen={setOpen}
          musicPlaying={musicPlaying}
          toggleMusic={pauseMusic}
          runCommand={makeRunCommand(bashmeInstance)}
        />
      )}
    </>
  );
};
