import { createAtom } from '../atoms';

declare global {
  interface Atom<T> {
    reset: () => void;
    UNSAFE_storage: {
      savedInitialValue: T;
    };
  }
}

type ResetAtomFn = () => void;

const resetAtom = createAtom({
  afterValueSet: (atom, value, firstSet) => {
    if (firstSet) {
      // @ts-ignore
      atom.UNSAFE_storage.savedInitialValue = value;
    }
  },
  onCreate: atom => {
    // @ts-ignore
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

export default resetAtom;
