import { DropArrayRecursive, LastInArray, UnaryFunction } from "../../types";

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
const compose = <Type>(...func: UnaryFunction<Type>[]) => {
  return (p: Type) => func.reduceRight((acc, cur) => cur(acc), p);
};

/**
 * @name
 * @description
 * @example
 * @author
 */
type UnaryFunctionT<Param, Return = Param> = (arg: Param) => Return;
const composeMulti = <
  Args extends UnaryFunctionT<any, any>[],
  T extends Parameters<LastInArray<Args>>[number],
  R extends ReturnType<Args[0]>
>(
  ...func: Args
) => {
  return (p: T | R) => func.reduceRight((acc, cur) => cur(acc), p);
};

export { compose, composeMulti };
