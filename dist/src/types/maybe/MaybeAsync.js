"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaybeAsync = void 0;
const MaybeContainer_1 = require("./MaybeContainer");
class MaybeAsync extends MaybeContainer_1.MaybeContainer {
    constructor(inputValue) {
        super(inputValue);
        if (inputValue && !(inputValue instanceof Promise))
            this.containerValue = Promise.resolve(inputValue);
    }
    unwrapAwait = async () => await this.containerValue;
}
exports.MaybeAsync = MaybeAsync;
