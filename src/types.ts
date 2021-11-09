export type Atom<T> = {
  get: GetAtomFn<T>;
  set: SetAtomFn<T>;
  subscribe: SubscribeAtomFn<T>;
  UNSAFE_directSet: DirectSetAtomFn<T>;
  UNSAFE_notify: NotifyFn;
  UNSAFE_storage: WeakMap<StorageKey, any>;
};

export type StorageKey = {
  key: string;
};

export type ValueOrFn<T> = T | ((oldValue: T) => T) | ((oldValue: T) => Promise<T>);

export type GetAtomInInitialFn<R> = (get: <V>(atom: Atom<V>) => V) => R;

export type InitialValueOrFn<T> = T | GetAtomInInitialFn<T> | GetAtomInInitialFn<Promise<T>>;

export type SetAtomOptions = {
  noSuspense?: boolean;
  equal?: (a: any, b: any) => boolean;
  fromInit?: boolean;
};

export type GetAtomFn<T> = () => T;
export type SetAtomFn<T> = (newValue: ValueOrFn<T>, options?: SetAtomOptions) => void;
export type Subscriber<T> = (newValue: T) => void;
export type SubscribeAtomFn<T> = (subscriber: Subscriber<T>) => void;
export type DirectSetAtomFn<T> = (newValue: T) => void;
export type NotifyFn = () => void;

export type Hooks<T, AtomValue extends Atom<T> = Atom<T>> = {
  beforeValueSet?: (atom: AtomValue, atomValue: T, firstSet: boolean) => T;
  afterValueSet?: (atom: AtomValue, atomValue: T, firstSet: boolean) => void;
  onCreate?: (atom: AtomValue) => AtomValue;
};

export type Dispatcher<T> = {
  [key: string]: ((...param: any) => T) | ((...param: any) => Promise<T>);
};

export enum PromiseStatus {
  PENDING,
  SUCCESS,
  ERROR,
}

export type SuspenseResult<T> = {
  read: () => T;
};
