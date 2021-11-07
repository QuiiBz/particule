import React, { FC, Suspense } from 'react';
import { fireEvent } from '@testing-library/react';
import { render, wait } from './test-util';
import { atom, useAtom, useGetAtom } from '../src';

describe('compose', () => {
  it('should compose one atom', async () => {
    const baseCount = 10;
    const secondAdd = 50;
    const countAtom = atom(baseCount);
    const secondCountAtom = atom(get => get(countAtom) + secondAdd);

    const App: FC = () => {
      const count = useGetAtom(countAtom);
      const secondCount = useGetAtom(secondCountAtom);

      return (
        <>
          <p>{count}</p>
          <p>{secondCount}</p>
        </>
      );
    };

    const { findByText } = render(<App />);

    await findByText(baseCount);
    await findByText(baseCount + secondAdd);
  });

  it('should compose multiple atoms', async () => {
    const baseCount = 10;
    const secondBaseCount = 20;
    const countAtom = atom(baseCount);
    const secondCountAtom = atom(secondBaseCount);
    const thirdCountAtom = atom(get => get(countAtom) + get(secondCountAtom));

    const App: FC = () => {
      const count = useGetAtom(countAtom);
      const secondCount = useGetAtom(secondCountAtom);
      const thirdCount = useGetAtom(thirdCountAtom);

      return (
        <>
          <p>{count}</p>
          <p>{secondCount}</p>
          <p>{thirdCount}</p>
        </>
      );
    };

    const { findByText } = render(<App />);

    await findByText(baseCount);
    await findByText(secondBaseCount);
    await findByText(baseCount + secondBaseCount);
  });

  it('should compose and subscribe to atom', async () => {
    const eurosAtom = atom(10);
    const dollarsAtom = atom(get => get(eurosAtom) * 1.15);

    const App: FC = () => {
      const [euros, setEuros] = useAtom(eurosAtom);
      const [dollars, setDollars] = useAtom(dollarsAtom);

      return (
        <>
          <input
            aria-label="euros"
            onChange={({ target }) => setEuros(target.value as unknown as number)}
            value={euros}
          />
          <input
            aria-label="dollars"
            onChange={({ target }) => setDollars(target.value as unknown as number)}
            value={dollars}
          />
        </>
      );
    };

    const { findByDisplayValue, getByLabelText } = render(<App />);

    await findByDisplayValue(10);
    await findByDisplayValue(11.5);
    fireEvent.change(getByLabelText('euros'), { target: { value: 100 } });
    await findByDisplayValue(100);
    await findByDisplayValue(114.99999999999999);
    fireEvent.change(getByLabelText('dollars'), { target: { value: 50 } });
    await findByDisplayValue(100);
    await findByDisplayValue(50);
  });

  it('should compose and subscribe to atom with base atom suspensed', async () => {
    const eurosAtom = atom<number>(async () => {
      await wait(1);
      return 10;
    });
    const dollarsAtom = atom(get => get(eurosAtom) * 1.15);

    const App: FC = () => {
      const [euros, setEuros] = useAtom(eurosAtom);
      const [dollars, setDollars] = useAtom(dollarsAtom);

      return (
        <>
          <input
            aria-label="euros"
            onChange={({ target }) => setEuros(target.value as unknown as number)}
            value={euros}
          />
          <input
            aria-label="dollars"
            onChange={({ target }) => setDollars(target.value as unknown as number)}
            value={dollars}
          />
        </>
      );
    };

    const { findByDisplayValue, getByLabelText, findByText } = render(
      <Suspense fallback="Loading">
        <App />
      </Suspense>,
    );

    await findByText('Loading');
    await wait(1);
    await findByDisplayValue(10);
    await findByDisplayValue(11.5);
    fireEvent.change(getByLabelText('euros'), { target: { value: 100 } });
    await findByDisplayValue(100);
    await findByDisplayValue(114.99999999999999);
    fireEvent.change(getByLabelText('dollars'), { target: { value: 50 } });
    await findByDisplayValue(100);
    await findByDisplayValue(50);
  });

  it('should compose and subscribe to atom with composed atom suspensed', async () => {
    const eurosAtom = atom(10);
    const dollarsAtom = atom<number>(async get => {
      await wait(1);
      return get(eurosAtom) * 1.15;
    });

    const App: FC = () => {
      const [euros, setEuros] = useAtom(eurosAtom);
      const [dollars, setDollars] = useAtom(dollarsAtom);

      return (
        <>
          <input
            aria-label="euros"
            onChange={({ target }) => setEuros(target.value as unknown as number)}
            value={euros}
          />
          <input
            aria-label="dollars"
            onChange={({ target }) => setDollars(target.value as unknown as number)}
            value={dollars}
          />
        </>
      );
    };

    const { findByDisplayValue, getByLabelText, findByText } = render(
      <Suspense fallback="Loading">
        <App />
      </Suspense>,
    );

    await findByText('Loading');
    await wait(1);
    await findByDisplayValue(10);
    await findByDisplayValue(11.5);
    fireEvent.change(getByLabelText('euros'), { target: { value: 100 } });
    await findByDisplayValue(100);
    await findByDisplayValue(114.99999999999999);
    fireEvent.change(getByLabelText('dollars'), { target: { value: 50 } });
    await findByDisplayValue(100);
    await findByDisplayValue(50);
  });
});
