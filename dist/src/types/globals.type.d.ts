type ArrayInsideType<T> = T extends (infer U)[] ? U : T;
type UnaryFunction<T> = (arg: T) => T;
type UnaryFunctionAsync<T> = (arg: Awaited<T>) => Promise<T>;
type ArrayLength<T extends any[]> = T extends {
    length: infer L;
} ? L : never;
type DropFirstInArray<T extends any[]> = T extends [arg: any, ...rest: infer U] ? U : T;
type LastInArray<T extends any[]> = T[ArrayLength<DropFirstInArray<T>>];
export { ArrayInsideType, UnaryFunction, UnaryFunctionAsync, ArrayLength, DropFirstInArray, LastInArray, };
