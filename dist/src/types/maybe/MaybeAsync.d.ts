import { MaybeContainer } from "./MaybeContainer";
export declare class MaybeAsync<Type extends Promise<Type>> extends MaybeContainer<Promise<Type>> {
    constructor(inputValue?: Type);
    static async: <Type_1 extends Promise<Type_1>>(inputValue: Type_1) => Promise<Awaited<Type_1> extends infer T ? T extends Awaited<Type_1> ? T extends unknown[] ? import("./MaybeArray").MaybeArray<T> : import("./Maybe").Maybe<T> : never : never>;
    unwrapAwait: () => Promise<Type>;
}
