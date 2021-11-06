import { PromiseStatus, SuspenseResult } from '../types';

const suspensePromise = <T>(promise: Promise<T>, callback: (result: T) => void): SuspenseResult<T> => {
  let status: PromiseStatus = PromiseStatus.PENDING;
  let result: T;

  const suspender = promise.then(
    value => {
      status = PromiseStatus.SUCCESS;
      result = value;
      callback(result);
    },
    error => {
      status = PromiseStatus.ERROR;
      result = error;
    },
  );

  return {
    read: () => {
      switch (status) {
        case PromiseStatus.SUCCESS:
          return result;
        case PromiseStatus.ERROR:
          throw result;
        default:
          throw suspender;
      }
    },
  };
};

export default suspensePromise;
