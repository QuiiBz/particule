import React, { FC, Suspense } from 'react';
import { fireEvent } from '@testing-library/react';
import { render, wait } from './test-util';
import { atom, useAtom } from '../src';

describe('mutate', () => {
  it('should mutate', async () => {
    const text = 'Hello world';
    const newText = 'Updated!';
    const textAtom = atom(text);

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
    fireEvent.click(getByText('Update'));
    await findByText(`Value: ${newText}`);
  });

  it('should mutate with callback', async () => {
    const text = 'Hello world';
    const newText = 'Updated!';
    const textAtom = atom(() => text);

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
    fireEvent.click(getByText('Update'));
    await findByText(`Value: ${newText}`);
  });

  it('should mutate with suspense', async () => {
    const text = 'Hello world';
    const newText = 'Updated!';
    const textAtom = atom<string>(async () => {
      await wait(1);
      return text;
    });

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

    const { findByText, getByText } = render(
      <Suspense fallback="Loading">
        <App />
      </Suspense>,
    );

    await findByText('Loading');
    await wait(1);
    await findByText(`Value: ${text}`);
    fireEvent.click(getByText('Update'));
    await findByText(`Value: ${newText}`);
  });
});
