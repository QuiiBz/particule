import { fireEvent } from '@testing-library/react';
import React, { FC } from 'react';
import { render } from '../test-util';
import { useAtom, localStorageAtom } from '../../src';

describe('localStorage', () => {
  const text = 'Hello world';
  const newText = 'Updated!';
  const localStorageText = 'Local';
  const KEY = 'key';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should add value to localStorage', async () => {
    const textAtom = localStorageAtom(KEY)(text);

    const App: FC = () => {
      const [value, setValue] = useAtom(textAtom);

      return (
        <>
          <button type="button" onClick={() => setValue(newText)}>
            Update
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { findByText, getByText } = render(<App />);

    await findByText(`Value: ${text}`);
    expect(window.localStorage.getItem(KEY)).toEqual(JSON.stringify(text));
    fireEvent.click(getByText('Update'));
    await findByText(`Value: ${newText}`);
    expect(window.localStorage.getItem(KEY)).toEqual(JSON.stringify(newText));
  });

  it('should load value from localStorage', async () => {
    localStorage.setItem(KEY, JSON.stringify(localStorageText));

    const textAtom = localStorageAtom(KEY)(text);

    const App: FC = () => {
      const [value, setValue] = useAtom(textAtom);

      return (
        <>
          <button type="button" onClick={() => setValue(newText)}>
            Update
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { findByText } = render(<App />);

    await findByText(`Value: ${localStorageText}`);
  });
});
