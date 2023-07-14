"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeMultiAsync = exports.composeAsync = void 0;
const composeAsync = (...func) => {
    return async (p) => func.reduceRight(async (acc, cur) => cur(await acc), p);
};
exports.composeAsync = composeAsync;
const composeMultiAsync = (...func) => {
    return async (p) => func.reduceRight(async (acc, cur) => cur(await acc), p);
};
exports.composeMultiAsync = composeMultiAsync;
