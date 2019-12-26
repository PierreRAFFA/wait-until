import { IConditionFunction, IWaitUntilOptions } from './interfaces';
import { waitUntilDecorator, waitUntil as waitUntilWrapper } from './waitUntil';
import { constant, fibonacci } from './algorithms';

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


class Controller {
  constructor() {}

  @waitUntil({
    condition: (result: any) => result > .85,
    numRetries: 6
  })
  public async process1(shift: number): Promise<number> {
    return shift + Math.random();
  }

  @waitUntil({
    condition: (result: any, context: any) => context.isOk(result),
    numRetries: 6
  })
  public async process2(shift: number): Promise<number> {
    return shift + Math.random();
  }

  public isProcessOk(result: any) {
    return result > .85;
  }

}

(async () => {
  console.log('start');

  // //test 1
  // const t:Test = new Test();
  // const response = await t.request(0.01);
  // console.log(response);


const request = async (shift: number): Promise<number> => {
  const rand: number = shift + Math.random();
  console.log(shift);
  console.log(rand);
  console.log('request');;
  return rand;
};

//test 2
const condition: IConditionFunction = (result, context) => result > 0.9;
const result2 = await waitUntilWrapper<number>(request, {
  condition: condition,
  algorithm: fibonacci,
  numRetries: 3,
  onRetry: (result, context) => console.log('onRetry'),
  onError: (error, context) => console.log(error),
  onRetriesComplete: (context) => console.log('onRetriesComplete'),
})(0.2);

console.log(result2);

})();
