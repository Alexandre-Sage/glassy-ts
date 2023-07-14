import { LastInArray, UnaryFunction } from "../../types";
declare const compose: <Type>(...func: UnaryFunction<Type>[]) => (p: Type) => Type;
declare const composeMulti: <Args extends UnaryFunction<any>[], T extends Parameters<LastInArray<Args>>[number]>(...func: Args) => (p: T) => T;
export { compose, composeMulti };
