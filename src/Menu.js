import React from 'react';
import { css } from 'emotion';

const menuStyle = css`
  --menu-width: 280px;

  position: absolute;
  transform: translate3d(var(--menu-width), 0, 0);
  z-index: 3;
  top: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
  transition: transform 0.8s;
  background-color: rgba(251, 115, 121, 1);
  color: white;
  padding: 32px;
  box-shadow: 5px 5px 10px 10px rgba(0, 0, 0, 0.2);

  ul {
    height: 100%;
    overflow: auto;
    list-style-type: none;
    margin: 0;
    padding: 32px 0;

    li {
      margin: 0;
      padding: 8px 16px;
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

const menuToggleStyle = css`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  margin: 24px;
  border: 0;
  color: transparent;
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  background: 0;
  border: 1px solid rgba(251, 115, 121, 0.7);
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
      box-shadow: 0 0 0 10px rgba(251, 115, 121, 0);
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

  const aboutPressed = () => {
    setOpen(false);
    runCommand('whoami');
  };

  return (
    <>
      <button className={[menuToggleStyle, open ? menuToggleStyleOpen : ''].join(' ')} onClick={() => setOpen(!open)}>
        {open ? 'Open' : 'Close'}
      </button>

      <nav className={[menuStyle, open ? menuOpenStyle : ' '].join(' ')}>
        <ul>
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
            <button className={menuButtonStyle}>Projects</button>
          </li>
          <li>
            <button className={menuButtonStyle}>Screensaver</button>
          </li>
          <li>
            <a href="https://github.com/danmindru" target="_blank" rel="noopener noreferrer" className={menuButtonStyle}>
              Github @danmindru
            </a>
          </li>
          <li>
            <a href="https://twitter.com/d4m1n" target="_blank" rel="noopener noreferrer" className={menuButtonStyle}>
              Twitter @d4m1n
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
