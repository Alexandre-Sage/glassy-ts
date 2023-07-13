"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeMultiAsync = exports.composeAsync = void 0;
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
const composeAsync = (...func) => {
    return async (p) => func.reduceRight(async (acc, cur) => cur(await acc), p);
};
exports.composeAsync = composeAsync;
/**
 * @name
 * @description
 * @example
 * @author
 */
const composeMultiAsync = (...func) => {
    return async (p) => func.reduceRight(async (acc, cur) => cur(await acc), p);
};
exports.composeMultiAsync = composeMultiAsync;
