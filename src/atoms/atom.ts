/* eslint-disable @typescript-eslint/naming-convention */
import {
  Atom,
  SubscribeAtomFn,
  SetAtomFn,
  Subscriber,
  GetAtomFn,
  InitialValueOrFn,
  Hooks,
  NotifyFn,
  GetAtomInInitialFn,
  ValueOrFn,
  DirectSetAtomFn,
  SuspenseResult,
} from '../types';
import { isFunction, isSuspense, suspensePromise } from '../utils';

export const atom = <T>(initialValue: InitialValueOrFn<T>, hooks?: Hooks<T>): Atom<T> => {
  const subscribers: Subscriber<T>[] = [];
  let atomValue: T | SuspenseResult<T>;
  let firstSet = true;
  let theAtom: Atom<T>;

  const notify: NotifyFn = () => {
    subscribers.forEach(subscriber => subscriber(atomValue as T));
  };

  const get: GetAtomFn<T> = () => {
    if (isSuspense(atomValue)) {
      return atomValue.read();
    }

    return atomValue;
  };

  const set: SetAtomFn<T> = (newValue, options) => {
    const shouldAlwaysNotify = !options?.noSuspense;
    const equalFn = options?.equal || Object.is;

    const setAtomValue = (value: T, shouldNotify: boolean) => {
      if (equalFn(atomValue, value)) {
        return;
      }

      atomValue = hooks?.beforeValueSet?.(theAtom, value, firstSet) || value;
      hooks?.afterValueSet?.(theAtom, atomValue, firstSet);
      firstSet = false;

      if (shouldNotify) notify();
    };

    if (isFunction(newValue)) {
      let result: T | Promise<T>;

      if (options?.fromInit) {
        const initNewValue = newValue as unknown as GetAtomInInitialFn<T> | GetAtomInInitialFn<Promise<T>>;

        try {
          result = initNewValue(targetAtom => {
            targetAtom.subscribe(() => set(newValue, options));

            return targetAtom.get();
          });
        } catch (e) {
          atomValue = suspensePromise(e as Promise<T>, () => null);
          return;
        }
      } else {
        result = newValue(atomValue as T);
      }

      if (result instanceof Promise) {
        atomValue = suspensePromise(result, promiseResult => {
          setAtomValue(promiseResult, true);
        });
      } else {
        setAtomValue(result, !shouldAlwaysNotify);
      }
    } else {
      setAtomValue(newValue, !shouldAlwaysNotify);
    }

    if (shouldAlwaysNotify) notify();
  };

  const UNSAFE_directSet: DirectSetAtomFn<T> = newValue => {
    atomValue = newValue;
  };

  const subscribe: SubscribeAtomFn<T> = subscriber => subscribers.push(subscriber);

  // @ts-ignore
  theAtom = {
    get,
    set,
    subscribe,
    UNSAFE_directSet,
    UNSAFE_notify: notify,
    UNSAFE_storage: {},
  };

  set(initialValue as ValueOrFn<T>, { fromInit: true });

  return hooks?.onCreate?.(theAtom) || theAtom;
};

export default atom;
