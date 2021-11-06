import { atom } from './atom';
import { Hooks, InitialValueOrFn } from '../types';

const createAtom =
  (hooks: Hooks) =>
  <T>(initialValue: InitialValueOrFn<T>) =>
    atom<T>(initialValue, hooks as Hooks<T>);

export default createAtom;
