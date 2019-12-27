import { IWaitUntilOptions } from './interfaces';
import { constant } from './algorithms';

/**
 * Default Backoff Config
 */
export const DEFAULT_CONFIG: IWaitUntilOptions = {
  numRetries: 10,
  condition: (result: any) => true,
  algorithm: constant,
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////  WAITUNTIL FOR DECORATOR


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////  WAITUNTIL FOR FUNCTIONS


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////  WAITUNTIL MECHANISM
/**
 * Retries the function execution until:
 *   - the method is executed successfully
 *   - or, the max number of attempts have been reached
 *
 * @param originalFunction
 * @param context
 * @param args
 */
export async function retry<T>(originalFunction: any, context: any = undefined, args: any[], options: IWaitUntilOptions, retriesLeft: number): Promise<T> {
  let result: T;
  try {
    const functionResult: T = await originalFunction.apply(context, args);
    if (options.condition) {
      const conditionReached: boolean = options.condition(functionResult, context);
      if (conditionReached) {
        result = functionResult;
      }
    }
  } catch (e) {
    options.onError && options.onError(e, context);
  }


  if (!result) {
    if (retriesLeft) {
      const sleepDuration: number = options.algorithm && options.algorithm(options.numRetries - retriesLeft + 1);
      await sleep(sleepDuration);
      return await retry<T>(originalFunction, context, args, options, --retriesLeft);
    } else {
      //triggers onAllAttemptsReached callback
      options.onRetriesComplete && options.onRetriesComplete(context);
    }
  }

  return result;
}

/**
 * Sleeps after a fail for a certain amount of time
 *
 * @param duration in ms
 */
async function sleep(duration: number) {
  console.log(`Retrying in ${duration}ms`);
  return new Promise(resolve => setTimeout(resolve, duration));
}
