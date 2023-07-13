"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeMulti = exports.compose = void 0;
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
const compose = (...func) => {
    return (p) => func.reduceRight((acc, cur) => cur(acc), p);
};
exports.compose = compose;
/**
 * @name
 * @description
 * @example
 * @author
 */
const composeMulti = (...func) => {
    return (p) => func.reduceRight((acc, cur) => cur(acc), p);
};
exports.composeMulti = composeMulti;
