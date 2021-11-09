import { Atom, StorageKey } from '../types';
import { createAtom } from '../atoms';

export type ResetAtom<T = unknown> = Atom<T> & {
  reset: ResetAtomFn;
};

export type ResetAtomFn = () => void;

export const RESET_KEY: StorageKey = {
  key: 'initialValue',
};

export const NOT_RESET_ATOM_ERROR = '`useResetAtom` can only be used with atoms from `resetAtom`';

export const resetAtom = createAtom<ResetAtom>({
  afterValueSet: (atom, value, firstSet) => {
    if (firstSet) {
      atom.UNSAFE_storage.set(RESET_KEY, value);
    }
  },
  onCreate: atom => {
    atom.reset = () => {
      atom.UNSAFE_directSet(atom.UNSAFE_storage.get(RESET_KEY));
      atom.UNSAFE_notify();
    };

    return atom;
  },
});

export const useResetAtom = <T>(atom: Atom<T>): ResetAtomFn => {
  const isResetAtom = (value: Atom<T>): value is ResetAtom<T> => 'reset' in value;

  if (isResetAtom(atom)) {
    return atom.reset;
  }

  throw new Error(NOT_RESET_ATOM_ERROR);
};
