import { MaybeContainer } from "./MaybeContainer";
export declare class MaybeAsync<Type extends Promise<Type>> extends MaybeContainer<Promise<Type>> {
    constructor(inputValue?: Type);
    unwrapAwait: () => Promise<Type>;
}
