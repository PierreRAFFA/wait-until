// import { waitUntil } from './decorator';
// import { waitUntil as waitUntilWrapper } from './composition';
// import { IConditionFunction } from './interfaces';
// import { fibonacci } from './algorithms';
//
//
// class Controller {
//   constructor() {
//   }
//
//   @waitUntil({
//     condition: (result: any) => result > .25,
//     maxRetries: 6
//   })
//   public async process1(shift: number): Promise<number> {
//     return shift + Math.random();
//   }
//
//   @waitUntil({
//     condition: (result: any, context: any) => context.isProcessOk(result),
//     maxRetries: 6
//   })
//   public async process2(shift: number): Promise<number> {
//     return shift + Math.random();
//   }
//
//   public isProcessOk(result: any) {
//     return result > .85;
//   }
//
// }
//
// (async () => {
//   console.log('start');
//
//   //test 1
//   const controller:Controller = new Controller();
//   const response = await controller.process1(0.01);
//   console.log(response);
//
//
//   const request = async (shift: number): Promise<number> => {
//     const rand: number = shift + Math.random();
//     // console.log(shift);
//     // console.log(rand);
//     // console.log('request');
//     return rand;
//   };
//
// //test 2
//   const condition: IConditionFunction = (result) => result > 0.9;
//   const result2 = await waitUntilWrapper<number>(request, {
//     condition: condition,
//     algorithm: fibonacci,
//     maxRetries: 3,
//     onRetry: (result, context) => console.log('onRetry'),
//     onError: (error, context) => console.log(error),
//     onRetriesComplete: (context) => console.log('onRetriesComplete'),
//   })(0.2);
//
//   console.log(result2);
//
// })();
