type UnaryFunction<T> = (arg: T) => T;
type UnaryFunctionAsync<T> = (arg: Awaited<T>) => Promise<T>;
export { UnaryFunction, UnaryFunctionAsync };
