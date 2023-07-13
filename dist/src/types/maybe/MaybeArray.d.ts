import { Maybe } from "./Maybe";
import { MaybeContainer } from "./MaybeContainer";
export declare class MaybeArray<Type extends unknown[]> extends MaybeContainer<Type> {
    constructor(inputValue?: Type);
    map: <TypeMap>(callBack: (param: Type[number]) => TypeMap) => MaybeArray<TypeMap[]>;
    unwrapMap: <TypeMap>(callBack: (param: Type[number]) => TypeMap) => TypeMap[];
    filter: (callBack: (param: Type[number]) => Type[number] | boolean) => MaybeArray<Type[number][]>;
    unwrapFilter: (callBack: (param: Type[number]) => Type[number] | boolean) => Type[number][];
    find: (callBack: (param: Type[number]) => Type[number] | boolean) => Maybe<Type[number]>;
    includes: (value: Type[number]) => boolean;
    length: number | false;
    isEmpty: () => boolean;
}
