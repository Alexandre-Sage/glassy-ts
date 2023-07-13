import { MaybeContainer } from "./MaybeContainer";
export declare class Maybe<Type> extends MaybeContainer<Type> {
    constructor(inputValue?: Type);
    isNothing: () => boolean;
    map: <TypeMap>(callBack: (param: Type) => TypeMap) => MaybeContainer<TypeMap>;
    unwrapMap: <TypeMap>(callBack: (param: Type) => TypeMap) => TypeMap;
}
