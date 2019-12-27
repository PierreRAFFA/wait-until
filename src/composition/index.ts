import { IWaitUntilOptions } from '../interfaces';
import { DEFAULT_CONFIG, retry } from '../waitUntil';

/**
 * Wrapped a function into a backoff and returns the composition
 *
 * @param originalFunction
 * @param options
 */
export function waitUntil<T = any>(originalFunction: Function, options: IWaitUntilOptions = undefined): any {
  return async (...args: Array<any>) => {
    const fullOptions: IWaitUntilOptions = {...DEFAULT_CONFIG, ...options};
    return await retry<T>(originalFunction, this, args, fullOptions, fullOptions.numRetries);
  };
}