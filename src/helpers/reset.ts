import { Atom } from '../types';
import { Atom, StorageKey } from '../types';
import { createAtom } from '../atoms';

export type ResetAtom<T = unknown> = Atom<T> & {
  reset: ResetAtomFn;
};

export type ResetAtomFn = () => void;

export const resetAtom = createAtom({
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
  return atom.reset;
};
