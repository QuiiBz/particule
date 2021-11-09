import { atom } from './atom';
import { Hooks, Atom } from '../types';

const createAtom = <T extends Atom<unknown>>(hooks: Hooks<unknown, T>) => {
  const atomFn = atom.bind(hooks);

  return atomFn;
};

export default createAtom;
