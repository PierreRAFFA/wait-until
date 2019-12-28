export interface IWaitUntilOptions {
  condition: IConditionFunction;
  maxRetries: number;
  algorithm?: IAlgorithmFunction;
  onRetry?: IRetryFunction,
  onRetriesComplete?: IRetriesCompleteFunction,
  onError?: IErrorFunction,
}

export interface IConditionFunction extends Function {
  (result: any, context: any): boolean;
}

export interface IAlgorithmFunction extends Function {
  (index: number, context?: any): number;
}

export interface IRetryFunction extends Function {
  (result: any, context: any): any;
}

export interface IRetriesCompleteFunction extends Function {
  (context: any): any;
}

export interface IErrorFunction extends Function {
  (error: Error, context: any): void;
}