"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = void 0;
const curry = (functionToCur) => (p1) => (p2) => functionToCur(p1, p2);
exports.curry = curry;
