import { IWaitUntilOptions } from '../interfaces';
import { DEFAULT_CONFIG, retry } from '../waitUntil';

export function waitUntil(options: IWaitUntilOptions = undefined): Function {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalFunction = descriptor.value;

    const decoratedFunction = async function(...args: any[]): Promise<any> {
      return await waitUntilDecorator(originalFunction, options, this, ...args);
    };

    descriptor.value = decoratedFunction;
    return descriptor;
  };
}

/**
 * Executes a function as a decorator
 *
 * @param originalFunction
 * @param options
 * @param context
 * @param args
 */
async function waitUntilDecorator<T = any>(originalFunction: Function, options: IWaitUntilOptions = undefined, context: any, ...args: Array<any>): Promise<T> {
  const fullOptions: IWaitUntilOptions = {...DEFAULT_CONFIG, ...options};
  return await retry<T>(originalFunction, context, args, fullOptions, fullOptions.numRetries);
}