import { createAtom } from '../atoms';

const localStorageAtom = (key: string) =>
  createAtom({
    beforeValueSet: (_, value, firstSet) => {
      if (firstSet && localStorage.getItem(key) !== null) {
        return JSON.parse(localStorage.getItem(key)!);
      }

      return value;
    },
    afterValueSet: (_, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
  });

export default localStorageAtom;
