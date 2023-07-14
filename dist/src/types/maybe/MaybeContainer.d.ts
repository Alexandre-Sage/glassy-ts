import { Maybe } from "./Maybe";
import { MaybeArray } from "./MaybeArray";
export declare class MaybeContainer<Type> {
    static from<TypeValue>(ofInputValue?: TypeValue): Maybe<TypeValue>;
    static fromArray: <T extends unknown[]>(array?: T | undefined) => MaybeArray<T>;
    static new: <T>(inputValue: T) => T extends unknown[] ? MaybeArray<T> : Maybe<T>;
    static fromAsync: <Type_1>(inputValue: Promise<Type_1>) => Promise<Awaited<Type_1> extends infer T ? T extends Awaited<Type_1> ? T extends unknown[] ? MaybeArray<T> : Maybe<T> : never : never>;
    protected containerValue: Type;
    protected constructor(inputValue?: Type);
    isNothing: () => boolean;
    unwrap: () => Type;
    chain: <U>(callBack: (value: Type) => U) => MaybeContainer<U>;
    isError: () => boolean;
}
