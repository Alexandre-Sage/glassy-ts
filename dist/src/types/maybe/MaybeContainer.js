"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaybeContainer = void 0;
const Maybe_1 = require("./Maybe");
const MaybeArray_1 = require("./MaybeArray");
class MaybeContainer {
    static from(ofInputValue) {
        return new Maybe_1.Maybe(ofInputValue);
    }
    static fromArray = (array) => new MaybeArray_1.MaybeArray(array);
    static new = (inputValue) => {
        return (Array.isArray(inputValue)
            ? this.fromArray(inputValue)
            : this.from(inputValue));
    };
    containerValue;
    constructor(inputValue) {
        if (inputValue)
            this.containerValue = inputValue;
    }
    isNothing = () => this.containerValue === null || this.containerValue === undefined;
    unwrap = () => {
        if (this.isNothing())
            throw new Error("Value is undefined");
        return this.containerValue;
    };
    chain = (callBack) => new MaybeContainer(callBack(this.containerValue));
    isError = () => this.containerValue instanceof Error;
}
exports.MaybeContainer = MaybeContainer;
