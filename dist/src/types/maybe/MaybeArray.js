"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaybeArray = void 0;
const Maybe_1 = require("./Maybe");
const MaybeContainer_1 = require("./MaybeContainer");
class MaybeArray extends MaybeContainer_1.MaybeContainer {
    constructor(inputValue) {
        super(inputValue);
        if (inputValue && !Array.isArray(inputValue))
            throw new Error("Not an array");
    }
    map = (callBack) => {
        if (this.isNothing() || this.isEmpty())
            return new MaybeArray();
        return new MaybeArray(this.containerValue.map(callBack));
    };
    unwrapMap = (callBack) => {
        return this.containerValue.map(callBack);
    };
    filter = (callBack) => {
        if (this.isNothing() || this.isEmpty())
            return new MaybeArray();
        return new MaybeArray(this.containerValue.filter(callBack));
    };
    unwrapFilter = (callBack) => this.containerValue.filter((item) => callBack(item));
    find = (callBack) => {
        if (this.isNothing() || this.isEmpty())
            return new Maybe_1.Maybe();
        return MaybeContainer_1.MaybeContainer.from(this.containerValue.find(callBack));
    };
    includes = (value) => {
        if (this.isNothing() || this.isEmpty())
            false;
        return this.containerValue.includes(value);
    };
    length = !this.isNothing() && this.containerValue.length;
    isEmpty = () => this.isNothing() || !this.length;
}
exports.MaybeArray = MaybeArray;
