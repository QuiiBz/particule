import { Atom } from '../types';
import { createAtom } from '../atoms';

declare module '../types' {
  interface Atom<T> {
    reset: () => void;
    // @ts-ignore
    UNSAFE_storage: {
      savedInitialValue: T;
    };
  }
}

type ResetAtomFn = () => void;

export const resetAtom = createAtom({
  afterValueSet: (atom, value, firstSet) => {
    if (firstSet) {
      // @ts-ignore
      atom.UNSAFE_storage.savedInitialValue = value;
    }
  },
  onCreate: atom => {
    atom.reset = () => {
      // @ts-ignore
      atom.UNSAFE_directSet(atom.UNSAFE_storage.savedInitialValue);
      atom.UNSAFE_notify();
    };

    return atom;
  },
});

export const useResetAtom = <T>(atom: Atom<T>): ResetAtomFn => {
  return atom.reset;
};
