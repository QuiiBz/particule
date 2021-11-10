import { Atom, StorageKey } from '../types';
import { createAtom } from '../atoms';

export type HistoryAtom<T = unknown> = Atom<T> & {
  undo: () => void;
  redo: () => void;
};

export const PAST_KEY: StorageKey = {
  key: 'history',
};

export const PRESENT_KEY: StorageKey = {
  key: 'present',
};

export const FUTURE_KEY: StorageKey = {
  key: 'future',
};

export const historyAtom = createAtom<HistoryAtom>({
  beforeValueSet: (atom, value, firstSet) => {
    if (firstSet) {
      atom.UNSAFE_storage.set(PAST_KEY, []);
      atom.UNSAFE_storage.set(FUTURE_KEY, []);
    }

    const pastValues = atom.UNSAFE_storage.get(PAST_KEY);
    const presentValue = atom.UNSAFE_storage.get(PRESENT_KEY);
    const newPast = [...pastValues, presentValue];

    atom.UNSAFE_storage.set(PAST_KEY, newPast);
    atom.UNSAFE_storage.set(PRESENT_KEY, value);
  },
  onCreate: atom => {
    atom.undo = () => {
      const pastValues = atom.UNSAFE_storage.get(PAST_KEY);
      const pastValue = pastValues[pastValues.length - 1];
      const newPastValues = pastValues.slice(0, pastValues.length - 1);
      const presentValue = atom.UNSAFE_storage.get(PRESENT_KEY);
      const futureValues = atom.UNSAFE_storage.get(FUTURE_KEY);
      const newFutureValues = [presentValue, ...futureValues];

      atom.UNSAFE_storage.set(PAST_KEY, newPastValues);
      atom.UNSAFE_storage.set(PRESENT_KEY, pastValue);
      atom.UNSAFE_storage.set(FUTURE_KEY, newFutureValues);

      atom.UNSAFE_directSet(pastValue);
      atom.UNSAFE_notify();
    };

    atom.redo = () => {
      const futureValues = atom.UNSAFE_storage.get(FUTURE_KEY);
      const futureValue = futureValues[0];
      const newFutureValues = futureValues.slice(1);
      const presentValue = atom.UNSAFE_storage.get(PRESENT_KEY);
      const pastValues = atom.UNSAFE_storage.get(PAST_KEY);
      const newPastValues = [...pastValues, presentValue];

      atom.UNSAFE_storage.set(FUTURE_KEY, newFutureValues);
      atom.UNSAFE_storage.set(PRESENT_KEY, futureValue);
      atom.UNSAFE_storage.set(PAST_KEY, newPastValues);

      atom.UNSAFE_directSet(futureValue);
      atom.UNSAFE_notify();
    };

    return atom;
  },
  onGet: atom => {
    return atom.UNSAFE_storage.get(PRESENT_KEY);
  },
});
