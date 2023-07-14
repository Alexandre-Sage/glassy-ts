"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = void 0;
const MaybeContainer_1 = require("./MaybeContainer");
class Maybe extends MaybeContainer_1.MaybeContainer {
    constructor(inputValue) {
        super(inputValue);
    }
    isNothing = () => this.containerValue === null || this.containerValue === undefined;
    map = (callBack) => {
        if (this.isNothing())
            return new MaybeContainer_1.MaybeContainer();
        return MaybeContainer_1.MaybeContainer.new(callBack(this.containerValue));
    };
    unwrapMap = (callBack) => callBack(this.containerValue);
}
exports.Maybe = Maybe;
