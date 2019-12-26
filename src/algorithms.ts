import { IAlgorithmFunction } from './interfaces';

const CONSTANT_DURATION: number = 1000;

export const constant: IAlgorithmFunction = (index: number): number => CONSTANT_DURATION;
export const fibonacci: IAlgorithmFunction = (index: number): number => {
  console.log('index', index);
  let result: number;
  if (index == 0) {
    result = 0
  }else if (index == 1) {
    result = 1;
  }else{
    let prevPrev: number = 0;
    let prev: number = 1;

    for (let i = 2; i <= index; i++)
    {
      result = prev + prevPrev;
      console.log('result', result);
      prevPrev = prev;
      prev = result;
    }
  }
  console.log(result * 1000);
  return result * 1000;
};