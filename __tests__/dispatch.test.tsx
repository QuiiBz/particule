import React, { FC, Suspense } from 'react';
import { fireEvent } from '@testing-library/react';
import { render, wait } from './test-util';
import { atom, dispatch, useGetAtom } from '../src';

describe('dispatch', () => {
  it('should dispatch', async () => {
    const text = 'Hello world';
    const newText = 'Updated!';
    const textAtom = atom(text);
    const dispatchTextAtom = dispatch(textAtom, () => ({
      set: (newValue: string) => newValue,
    }));

    const App: FC = () => {
      const value = useGetAtom(textAtom);

      return (
        <>
          <button type="button" onClick={() => dispatchTextAtom('set', newText)}>
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

  it('should dispatch with multiple values', async () => {
    const text = 'Hello world';
    const newText = 'Updated!';
    const additionalText = 'AndMore!';
    const textAtom = atom(text);
    const dispatchTextAtom = dispatch(textAtom, () => ({
      set: (newValue: string, additional: string) => `${newValue}${additional}`,
    }));

    const App: FC = () => {
      const value = useGetAtom(textAtom);

      return (
        <>
          <button type="button" onClick={() => dispatchTextAtom('set', newText, additionalText)}>
            Update
          </button>
          <p>Value: {value}</p>
        </>
      );
    };

    const { findByText, getByText } = render(<App />);

    await findByText(`Value: ${text}`);
    fireEvent.click(getByText('Update'));
    await findByText(`Value: ${newText}${additionalText}`);
  });

  it('should dispatch using previous value', async () => {
    const firstItem = 'hello';
    const newItem = 'world';
    const list = [firstItem];
    const listAtom = atom(list);
    const dispatchListAtom = dispatch(listAtom, value => ({
      add: (newValue: string) => [...value, newValue],
      remove: (oldValue: string) => [...value].filter(current => current !== oldValue),
      clear: () => [],
    }));

    const App: FC = () => {
      const value = useGetAtom(listAtom);

      return (
        <>
          <button type="button" onClick={() => dispatchListAtom('add', newItem)}>
            Add item
          </button>
          <button type="button" onClick={() => dispatchListAtom('remove', newItem)}>
            Remove item
          </button>
          <button type="button" onClick={() => dispatchListAtom('clear')}>
            Clear
          </button>
          {value.map(item => (
            <p key={item}>{item}</p>
          ))}
        </>
      );
    };

    const { findByText, getByText, queryByText } = render(<App />);

    await findByText(firstItem);
    expect(await queryByText(newItem)).toBeNull();
    fireEvent.click(getByText('Add item'));
    await findByText(firstItem);
    await findByText(newItem);
    fireEvent.click(getByText('Remove item'));
    await findByText(firstItem);
    expect(await queryByText(newItem)).toBeNull();
    fireEvent.click(getByText('Clear'));
    expect(await queryByText(firstItem)).toBeNull();
    expect(await queryByText(newItem)).toBeNull();
  });

  it('should dispatch async using previous value', async () => {
    const firstItem = 'hello';
    const newItem = 'world';
    const list = [firstItem];
    const listAtom = atom(list);
    const dispatchListAtom = dispatch(listAtom, value => ({
      add: async (newValue: string) => {
        await wait(1);
        return [...value, newValue];
      },
      remove: async (oldValue: string) => {
        await wait(1);

        return [...value].filter(current => current !== oldValue);
      },
      clear: () => [],
    }));

    const App: FC = () => {
      const value = useGetAtom(listAtom);

      return (
        <>
          <button type="button" onClick={() => dispatchListAtom('add', newItem)}>
            Add item
          </button>
          <button type="button" onClick={() => dispatchListAtom('remove', newItem)}>
            Remove item
          </button>
          <button type="button" onClick={() => dispatchListAtom('clear')}>
            Clear
          </button>
          {value.map(item => (
            <p key={item}>{item}</p>
          ))}
        </>
      );
    };

    const { findByText, getByText, queryByText } = render(
      <Suspense fallback="Loading">
        <App />
      </Suspense>,
    );

    await findByText(firstItem);
    expect(await queryByText(newItem)).toBeNull();
    fireEvent.click(getByText('Add item'));
    await findByText('Loading');
    await findByText(firstItem);
    await findByText(newItem);
    fireEvent.click(getByText('Remove item'));
    await findByText('Loading');
    await findByText(firstItem);
    expect(await queryByText(newItem)).toBeNull();
    fireEvent.click(getByText('Clear'));
    // await findByText('Loading');
    expect(await queryByText(firstItem)).toBeNull();
    expect(await queryByText(newItem)).toBeNull();
  });
});
