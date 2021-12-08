import { Atom, Dispatcher } from '../types';

const dispatch = <T, D extends Dispatcher<T>>(
  atom: Atom<T>,
  dispatcher: (value: T) => D,
): (<R extends keyof D>(dispatchName: R, ...value: Parameters<D[R]>) => void) => {
  let atomValue = atom.get();

  atom.subscribe(newValue => {
    atomValue = newValue;
  });

  return (dispatchName, ...value) => {
    const theDispatch = dispatcher(atomValue);
    const dispatchFn = theDispatch[dispatchName];

    // @ts-ignore
    const dispatchResult = dispatchFn(...value);

    if (dispatchResult instanceof Promise) {
      dispatchResult.then(newValue => atom.set(newValue));
    } else {
      atom.set(dispatchResult);
    }
  };
};

export default dispatch;
