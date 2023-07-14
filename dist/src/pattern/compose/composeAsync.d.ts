import { LastInArray, UnaryFunctionAsync } from "../../types";
declare const composeAsync: <Type>(...func: UnaryFunctionAsync<Type>[]) => (p: Type | Promise<Type>) => Promise<Type>;
declare const composeMultiAsync: <Args extends ((t: Awaited<any>) => Promise<any>)[], T extends Parameters<LastInArray<Args>>[0]>(...func: Args) => (p: T | Promise<T>) => Promise<T>;
export { composeAsync, composeMultiAsync };
