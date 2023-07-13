import { LastInArray, UnaryFunctionAsync } from "../../types";
/**
 * @name composeAsync
 * @description functional programing async compose pattern
 * @example const first = async (x: number) => x + x;
    const second = async (y: number) => y * y;
    const third = async (z: number) => z - z;
    const composedCalculation = await composeAsync(third, second, first)(2);
    console.log(composedCalculation) will output 0;

 * @author Alexandre Sage
 */
declare const composeAsync: <Type>(...func: UnaryFunctionAsync<Type>[]) => (p: Type | Promise<Type>) => Promise<Type>;
/**
 * @name
 * @description
 * @example
 * @author
 */
declare const composeMultiAsync: <Args extends ((t: Awaited<any>) => Promise<any>)[], T extends Parameters<LastInArray<Args>>[0]>(...func: Args) => (p: T | Promise<T>) => Promise<T>;
export { composeAsync, composeMultiAsync };
