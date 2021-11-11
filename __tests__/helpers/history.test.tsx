import { fireEvent } from '@testing-library/react';
import React, { FC } from 'react';
import { render } from '../test-util';
import { atom, useAtom, useHistoryAtom, NOT_HISTORY_ATOM_ERROR, historyAtom } from '../../src';

describe('history', () => {
  it('should undo redo history atom', async () => {
    const baseCount = 0;
    const counterAtom = historyAtom(baseCount);

    const App: FC = () => {
      const [value, setValue] = useAtom(counterAtom);
      const { undo, redo } = useHistoryAtom(counterAtom);

      return (
        <>
          <button type="button" onClick={() => setValue(count => count + 1)}>
            Increment
          </button>
          <button type="button" onClick={undo}>
            Undo
          </button>
          <button type="button" onClick={redo}>
            Redo
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { findByText, getByText } = render(<App />);

    await findByText(`Value: ${baseCount}`);
    fireEvent.click(getByText('Increment'));
    await findByText(`Value: ${baseCount + 1}`);
    fireEvent.click(getByText('Undo'));
    await findByText(`Value: ${baseCount}`);
    fireEvent.click(getByText('Redo'));
    await findByText(`Value: ${baseCount + 1}`);
  });

  it('should undo redo history atom after many changes', async () => {
    const baseCount = 0;
    const counterAtom = historyAtom(baseCount);

    const App: FC = () => {
      const [value, setValue] = useAtom(counterAtom);
      const { undo, redo } = useHistoryAtom(counterAtom);

      return (
        <>
          <button type="button" onClick={() => setValue(count => count + 1)}>
            Increment
          </button>
          <button type="button" onClick={undo}>
            Undo
          </button>
          <button type="button" onClick={redo}>
            Redo
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { findByText, getByText } = render(<App />);

    await findByText(`Value: ${baseCount}`);

    for (let i = 1; i < 10; i++) {
      fireEvent.click(getByText('Increment'));
      await findByText(`Value: ${baseCount + i}`);
    }

    for (let i = 1; i < 6; i++) {
      fireEvent.click(getByText('Undo'));
      await findByText(`Value: ${baseCount + 10 - i - 1}`);
    }

    for (let i = 5; i < 8; i++) {
      fireEvent.click(getByText('Redo'));
      await findByText(`Value: ${baseCount + i}`);
    }
  });

  it('should throw if useHistoryAtom is used without a HistoryAtom', async () => {
    const text = 'Hello world';
    const textAtom = atom(text);

    const App: FC = () => {
      const { undo } = useHistoryAtom(textAtom);

      return (
        <>
          <button type="button" onClick={undo}>
            Undo
          </button>
        </>
      );
    };

    expect(() => render(<App />)).toThrowError(NOT_HISTORY_ATOM_ERROR);
  });
});
