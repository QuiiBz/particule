import { SuspenseResult } from '../types';

export const isSuspense = <T>(arg: T | SuspenseResult<T>): arg is SuspenseResult<T> => {
  return typeof arg === 'object' && 'read' in arg;
};

export const isFunction = (arg: any): arg is Function => typeof arg === 'function';
