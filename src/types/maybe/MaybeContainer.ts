import { Maybe } from "./Maybe";
import { MaybeArray } from "./MaybeArray";

export class MaybeContainer<Type> {
 public static from<TypeValue>(ofInputValue?: TypeValue) {
   return new Maybe(ofInputValue);
 }

 public static fromArray = <T extends unknown[]>(array?: T) =>
   new MaybeArray(array);

 public static new = <T>(
   inputValue: T
 ): T extends unknown[] ? MaybeArray<T> : Maybe<T> => {
   return (
     Array.isArray(inputValue)
       ? this.fromArray(inputValue)
       : this.from(inputValue)
   ) as T extends unknown[] ? MaybeArray<T> : Maybe<T>;
 };
 protected containerValue!: Type;

 constructor(inputValue?: Type) {
   if (inputValue) this.containerValue = inputValue;
 }

 public isNothing = () =>
   this.containerValue === null || this.containerValue === undefined;

 public unwrap = () => {
   if (this.isNothing()) throw new Error("Value is undefined");
   return this.containerValue;
 };

 public chain = <U>(callBack: (value: Type) => U) =>
   new MaybeContainer(callBack(this.containerValue));

 public isError = () => this.containerValue instanceof Error;
}




