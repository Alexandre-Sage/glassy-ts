import { LastInArray, UnaryFunction } from "../../types";
/**
 * @name compose
 * @description functional programing compose pattern
 * @example const first = (x: number) => x + x;
    const second = (y: number) => y * y;
    const third = (z: number) => z - z;
    const composedCalculation = compose(third, second, first)(2);
    console.log(composedCalculation) //will output 0
 * @author Alexandre Sage
*/
declare const compose: <Type>(...func: UnaryFunction<Type>[]) => (p: Type) => Type;
/**
 * @name
 * @description
 * @example
 * @author
 */
declare const composeMulti: <Args extends UnaryFunction<any>[], T extends Parameters<LastInArray<Args>>[number]>(...func: Args) => (p: T) => T;
export { compose, composeMulti };
