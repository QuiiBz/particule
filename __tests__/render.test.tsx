import React, { FC, Suspense } from 'react';
import { fireEvent } from '@testing-library/react';
import { render, wait } from './test-util';
import { atom, useAtom, useGetAtom } from '../src';

describe('render', () => {
  it('should render with useAtom', async () => {
    const text = 'Hello world';
    const textAtom = atom(text);

    const App: FC = () => {
      const [value] = useAtom(textAtom);

      return <p>Value: {value}</p>;
    };

    const { findByText } = render(<App />);

    await findByText(`Value: ${text}`);
  });

  it('should render with useGetAtom', async () => {
    const text = 'Hello world';
    const textAtom = atom(text);

    const App: FC = () => {
      const value = useGetAtom(textAtom);

      return <p>Value: {value}</p>;
    };

    const { findByText } = render(<App />);

    await findByText(`Value: ${text}`);
  });

  it('should render with callback', async () => {
    const text = 'Hello world';
    const textAtom = atom(() => text);

    const App: FC = () => {
      const [value] = useAtom(textAtom);

      return <p>Value: {value}</p>;
    };

    const { findByText } = render(<App />);

    await findByText(`Value: ${text}`);
  });

  it('should render with suspense', async () => {
    const text = 'Hello world';
    const textAtom = atom(async () => {
      await wait(1);
      return text;
    });

    const App: FC = () => {
      const [value] = useAtom(textAtom);

      return <p>Value: {value}</p>;
    };

    const { findByText } = render(
      <Suspense fallback="Loading">
        <App />
      </Suspense>,
    );

    await findByText('Loading');
    await wait(1);
    await findByText(`Value: ${text}`);
  });
});

describe('re-render', () => {
  it('should re-render when value change', async () => {
    const text = 'Hello world';
    const newText = 'Updated!';
    const textAtom = atom(text);
    const renderFn = jest.fn();

    const App: FC = () => {
      const [value, setValue] = useAtom(textAtom);

      renderFn();

      return (
        <>
          <button type="button" onClick={() => setValue(newText)}>
            Update
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { getByText } = render(<App />);

    fireEvent.click(getByText('Update'));

    expect(renderFn).toHaveBeenCalledTimes(2);
  });

  it("should not re-render when value doesn't change", async () => {
    const text = 'Hello world';
    const newText = text;
    const textAtom = atom(text);
    const renderFn = jest.fn();

    const App: FC = () => {
      const [value, setValue] = useAtom(textAtom);

      renderFn();

      return (
        <>
          <button type="button" onClick={() => setValue(newText)}>
            Update
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { getByText } = render(<App />);

    fireEvent.click(getByText('Update'));

    expect(renderFn).toHaveBeenCalledTimes(1);
  });
});
