import { fireEvent } from '@testing-library/react';
import React, { FC } from 'react';
import { render } from '../test-util';
import { atom, useAtom, resetAtom, useResetAtom, NOT_RESET_ATOM_ERROR } from '../../src';

describe('reset', () => {
  it('should reset atom', async () => {
    const text = 'Hello world';
    const newText = 'Updated!';
    const textAtom = resetAtom(text);

    const App: FC = () => {
      const [value, setValue] = useAtom(textAtom);
      const reset = useResetAtom(textAtom);

      return (
        <>
          <button type="button" onClick={() => setValue(newText)}>
            Update
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { findByText, getByText } = render(<App />);

    await findByText(`Value: ${text}`);
    fireEvent.click(getByText('Update'));
    await findByText(`Value: ${newText}`);
    fireEvent.click(getByText('Reset'));
    await findByText(`Value: ${text}`);
  });

  it('should reset atom after many changes', async () => {
    const text = 'Hello world';
    const textAtom = resetAtom(text);

    const App: FC = () => {
      const [value, setValue] = useAtom(textAtom);
      const reset = useResetAtom(textAtom);

      return (
        <>
          <button type="button" onClick={() => setValue(Math.random().toString())}>
            Update
          </button>
          <button type="button" onClick={reset}>
            Reset
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { findByText, getByText, queryByText } = render(<App />);

    await findByText(`Value: ${text}`);

    for (let i = 0; i < 10; i++) {
      fireEvent.click(getByText('Update'));
      expect(queryByText(`Value: ${text}`)).toBeNull();
    }

    fireEvent.click(getByText('Reset'));
    await findByText(`Value: ${text}`);
  });

  it('should throw if useResetAtom is used without a ResetAtom', async () => {
    const text = 'Hello world';
    const textAtom = atom(text);

    const App: FC = () => {
      const reset = useResetAtom(textAtom);

      return (
        <>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </>
      );
    };

    expect(() => render(<App />)).toThrowError(NOT_RESET_ATOM_ERROR);
  });
});
