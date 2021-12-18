import { createAtom } from '../atoms';

const isClient = typeof window !== 'undefined';

const localStorageAtom = (key: string) =>
  createAtom({
    beforeValueSet: (_, value, firstSet) => {
      if (firstSet && isClient && localStorage.getItem(key) !== null) {
        return JSON.parse(localStorage.getItem(key)!);
      }

      return value;
    },
    afterValueSet: (_, value) => {
      if (isClient) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
  });

export default localStorageAtom;
