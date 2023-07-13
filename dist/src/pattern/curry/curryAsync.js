"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curryAsync = void 0;
const curryAsync = (functionToCur) => (p1) => async (p2) => await functionToCur(p1, p2);
exports.curryAsync = curryAsync;
