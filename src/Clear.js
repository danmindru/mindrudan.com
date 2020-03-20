import React, { useState } from 'react';
import { css } from 'emotion';
import { COMMAND_NAMES } from './commands/command-constants';
import { useRecursiveTimeout } from './utils/useRecursiveTimeout';
import { clearEffects } from './3d/clear-effects';

const clearStyle = css`
  position: fixed;
  top: 19px;
  right: 75px;
  border: 0;
  z-index: 4;
  padding: 12px 20px;
  font-size: 0.8rem;
  background-color: rgba(251, 115, 121, 0.7);
  backdrop-filter: blur(3px);
  color: white;
  box-shadow: 5px 5px 10px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

export const Clear = ({ runCommand, bashme, menuOpen }) => {
  const [visible, setVisible] = useState(false);

  const clear = () => {
    bashme.cli.terminalHistory = [];
    runCommand(COMMAND_NAMES.CLEAR);

    clearEffects();
  };

  useRecursiveTimeout(() => {
    setVisible(
      bashme && bashme.cli && bashme.cli.terminalHistory.length && !menuOpen
    );
  }, 1000);

  if (!visible) {
    return <></>;
  }

  return (
    <button className={clearStyle} onClick={clear}>
      Clear
    </button>
  );
};
