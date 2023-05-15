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
const compose = <Type>(...func: UnaryFunction<Type>[]) => {
  return (p: Type) => func.reduceRight((acc, cur) => cur(acc), p);
};

/**
 * @name
 * @description
 * @example
 * @author
 */

const composeMulti = <
  Args extends UnaryFunction<any>[],
  T extends Parameters<LastInArray<Args>>[number]
>(
  ...func: Args
) => {
  return (p: T) => func.reduceRight((acc, cur) => cur(acc), p);
};

export { compose, composeMulti };
