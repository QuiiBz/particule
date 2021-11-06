import { useCallback, useEffect, useState } from 'react';
import { Atom, SetAtomFn } from '../types';

export const useAtom = <T>(atom: Atom<T>): [T, SetAtomFn<T>] => {
  const [, setValue] = useState(atom.get());

  useEffect(() => atom.subscribe(setValue), [atom]);

  return [atom.get(), atom.set];
};

export const useGetAtom = <T>(atom: Atom<T>): T => {
  return useAtom(atom)[0];
};

export const useSetAtom = <T>(atom: Atom<T>): SetAtomFn<T> => {
  return useCallback((...args) => atom.set(...args), [atom]);
};
