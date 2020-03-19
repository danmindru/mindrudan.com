import React from 'react';
import { css } from 'emotion';

import { ReactComponent as GithubIcon } from './icons/github-icon.svg';
import { ReactComponent as StackoverflowIcon } from './icons/stackoverflow-icon.svg';
import { ReactComponent as TwitterIcon } from './icons/twitter-icon.svg';
import { ReactComponent as LinkedinIcon } from './icons/linkedin-icon.svg';
import { COMMAND_NAMES } from './commands/command-constants';
import { wait } from './utils/wait';

const menuStyle = css`
  --menu-width: 300px;

  display: flex;
  flex-direction: column;
  height: calc(100vh - 32px);
  padding: 32px;
  transform: translate3d(var(--menu-width), 0, 0);
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  overflow: auto;
  transition: transform 0.8s;
  background-color: rgba(251, 115, 121, 0.7);
  backdrop-filter: blur(3px);
  color: white;
  box-shadow: 5px 5px 10px 10px rgba(0, 0, 0, 0.2);
`;

const menuListStyle = css`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  list-style-type: none;
  margin: 0;
  padding: 32px 0;
  flex-shrink: 0;

  li {
    margin: 0;
    padding: 8px 16px;

    svg {
      margin-right: 8px;
    }

    a {
      display: flex;
      align-items: center;
    }
  }
`;

const menuListSocialStyle = css`
  margin-top: auto;

  li {
    &:first-child {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;

const menuOpenStyle = css`
  transform: translate3d(0, 0, 0);
  transition: transform 0.8s;
`;

const menuButtonStyle = css`
  font-size: 1rem;
  text-decoration: none;
  padding: 0;
  border: 0;
  background: 0;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;

  &:hover,
  &:focus {
    color: white;
    outline: 0;
  }
`;

const menuToggleContainerStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  padding: 24px;
  border: 0;
  color: transparent;
  display: inline-block;
  background: 0;
  user-select: none;
  font-size: 0;

  :hover,
  :focus {
    outline: 0;
  }
`;

const menuToggleStyle = css`
  border: 0;
  color: transparent;
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background: 0;
  border: 2px solid rgba(251, 115, 121, 0.7);
  box-shadow: 0 0 0 rgba(251, 115, 121, 0.4);
  animation: pulse 2s infinite;
  transition: 0.3s border;

  :hover,
  :focus {
    animation: none;
    transition: 0.3s border;
    outline: 0;
    border: 2px solid rgba(251, 115, 121, 1);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(251, 115, 121, 0.4);
    }
    70% {
      box-shadow: 0 0 0 20px rgba(251, 115, 121, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(251, 115, 121, 0);
    }
  }
`;

const menuToggleStyleOpen = css`
  opacity: 0;
`;

export const Menu = (props) => {
  const { open, setOpen, runCommand } = props;

  const aboutPressed = async () => {
    setOpen(false);

    await wait(100);
    runCommand(COMMAND_NAMES.PHOTO);
    await wait(1000);
    runCommand(COMMAND_NAMES.WHOAMI);
  };

  const workPressed = () => {
    setOpen(false);
    runCommand(COMMAND_NAMES.WORK);
  };

  const contactPressed = () => {
    setOpen(false);
    runCommand(COMMAND_NAMES.CONTACT);
  };

  return (
    <>
      <button
        className={menuToggleContainerStyle}
        onClick={() => setOpen(!open)}
      >
        <span
          className={[menuToggleStyle, open ? menuToggleStyleOpen : ''].join(
            ' '
          )}
        >
          {open ? 'Open' : 'Close'}
        </span>
      </button>

      <nav className={[menuStyle, open ? menuOpenStyle : ' '].join(' ')}>
        <ul className={menuListStyle}>
          <li>
            <button className={menuButtonStyle} onClick={() => setOpen(!open)}>
              Terminal
            </button>
          </li>
          <li>
            <button onClick={aboutPressed} className={menuButtonStyle}>
              About
            </button>
          </li>
          <li>
            <button onClick={contactPressed} className={menuButtonStyle}>
              Contact
            </button>
          </li>
          <li>
            <button onClick={workPressed} className={menuButtonStyle}>
              Work
            </button>
          </li>
        </ul>

        <ul className={[menuListStyle, menuListSocialStyle].join(' ')}>
          <li>
            <a
              href="https://github.com/danmindru"
              target="_blank"
              rel="noopener noreferrer"
              className={menuButtonStyle}
            >
              <GithubIcon /> @danmindru
            </a>
          </li>
          <li>
            <a
              href="https://stackoverflow.com/users/3263450/dan-mindru"
              target="_blank"
              rel="noopener noreferrer"
              className={menuButtonStyle}
            >
              <StackoverflowIcon /> dan-mindru
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/d4m1n"
              target="_blank"
              rel="noopener noreferrer"
              className={menuButtonStyle}
            >
              <TwitterIcon /> @d4m1n
            </a>
          </li>
          <li>
            <a
              href="https://dk.linkedin.com/in/danmindru"
              target="_blank"
              rel="noopener noreferrer"
              className={menuButtonStyle}
            >
              <LinkedinIcon /> Dan Mindru
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
