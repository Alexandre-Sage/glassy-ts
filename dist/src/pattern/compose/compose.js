"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeMulti = exports.compose = void 0;
const compose = (...func) => {
    return (p) => func.reduceRight((acc, cur) => cur(acc), p);
};
exports.compose = compose;
const composeMulti = (...func) => {
    return (p) => func.reduceRight((acc, cur) => cur(acc), p);
};
exports.composeMulti = composeMulti;
