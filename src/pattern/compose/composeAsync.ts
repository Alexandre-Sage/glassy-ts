import { LastInArray, UnaryFunctionAsync } from "../../types/internal";
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

const composeAsync = <Type>(...func: UnaryFunctionAsync<Type>[]) => {
  return async (p: Type | Promise<Type>) =>
    func.reduceRight(async (acc, cur) => cur(await acc), p);
};
/**
 * @name
 * @description
 * @example
 * @author
 */
const composeMultiAsync = <
  Args extends ((t: Awaited<any>) => Promise<any>)[],
  T extends Parameters<LastInArray<Args>>[0]
>(
  ...func: Args
) => {
  return async (p: T | Promise<T>) =>
    func.reduceRight(async (acc, cur) => cur(await acc), p);
};

export { composeAsync, composeMultiAsync };
