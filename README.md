# wait-until

### As a Typescript decorator

> Note that a decorator can only be used in a class or method class

```typescript
class Controller {
  constructor() {}
  
  @waitUntil({
    condition: (result: any) => result > .85,
    numRetries: 6
  })
  public async process(shift: number): Promise<number> {
    return shift + Math.random();
  }
}
```
  
  
The condition function can be a class method as well, and the result will be exactly the same:
```typescript
class Controller {
  constructor() {}

  @waitUntil({
    condition: (result: any, context: any) => context.isProcessOk(result),
    numRetries: 6
  })
  public async process(shift: number): Promise<number> {
    return shift + Math.random();
  }

  public isProcessOk(result: any) {
    return result > .85;
  }
}
```

You can simply call `process` as follow.  
And the controller will execute until the condition is reached (result > .85), following the maximum amount of retries.
```typescript
const controller: Controller = new Controller();
const response: number = await controller.process(0.1);
console.log(response);
```

### As a composition

```typescript
const process = async (shift: number): Promise<number> => {
  return shift + Math.random();
};


const condition: IConditionFunction = (result, context) => result > 0.9;
const response = await waitUntilWrapper<number>(request, {
  condition: condition,
  algorithm: fibonacci,
  numRetries: 3,
  onRetry: (result, context) => console.log('onRetry'),
  onError: (error, context) => console.log(error),
  onRetriesComplete: (result, context) => console.log('onRetriesComplete'),
})(0.2);

console.log(response);
```

### WaitUntil Options

**condition**: 
Function which tests the response of the original function. 
If the condition returns true, then the response is returned. If false, the original function will be executed again until the number of retries has been reached.
**numRetries**:
Specifies the maximum number of retries

**algorithm**: (optional)
Can be _constant_, _fibonacci_ or a custom function managed by you.
To use the native algorithm, first import it. 

**onRetry**: (optional)
Function called on each retry
This function should implement `IRetryFunction`

**onRetriesComplete**: (optional)
Function called when the condition has never been reached after all retries
This function should implement `IRetriesCompleteFunction`

**onError**: (optional)
Function called when an error occurs during the execution of the original function. 
When an error occurs, it won't stop the process and the original function can be called again if the maximum number of retries have not been reached yet.
This function should implement `IErrorFunction`

