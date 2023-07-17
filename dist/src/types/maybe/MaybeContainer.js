"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = exports.MaybeArray = exports.MaybeAsync = exports.MaybeContainer = void 0;
class MaybeContainer {
    containerValue;
    static from = (ofInputValue) => new Maybe(ofInputValue);
    static fromArray = (array) => new MaybeArray(array);
    static async = (inputValue) => new MaybeAsync(inputValue);
    static new = (inputValue) => {
        return (Array.isArray(inputValue)
            ? this.fromArray(inputValue)
            : inputValue instanceof Promise
                ? this.async(inputValue)
                : this.from(inputValue));
    };
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
class MaybeAsync extends MaybeContainer {
    constructor(inputValue) {
        super(inputValue);
        if (inputValue && !(inputValue instanceof Promise))
            this.containerValue = inputValue;
    }
    resolve = async () => MaybeContainer.new(await this.containerValue);
}
exports.MaybeAsync = MaybeAsync;
class MaybeArray extends MaybeContainer {
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
            return MaybeContainer.new();
        return MaybeContainer.from(this.containerValue.find(callBack));
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
class Maybe extends MaybeContainer {
    constructor(inputValue) {
        super(inputValue);
    }
    isNothing = () => this.containerValue === null || this.containerValue === undefined;
    map = (callBack) => {
        if (this.isNothing())
            return new MaybeContainer();
        return MaybeContainer.new(callBack(this.containerValue));
    };
    unwrapMap = (callBack) => callBack(this.containerValue);
}
exports.Maybe = Maybe;
