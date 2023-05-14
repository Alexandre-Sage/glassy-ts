import { Maybe } from "./Maybe";
import { MaybeContainer } from "./MaybeContainer";

export class MaybeArray<Type extends unknown[]> extends MaybeContainer<Type> {
 constructor(inputValue?: Type) {
   super(inputValue);
   if (inputValue && !Array.isArray(inputValue))
     throw new Error("Not an array");
 }
 map = <TypeMap>(
   callBack: (param: Type[0]) => TypeMap
 ): MaybeArray<TypeMap[]> => {
   if (this.isNothing() || this.isEmpty()) return new MaybeArray();
   return new MaybeArray<TypeMap[]>(this.containerValue.map(callBack));
 };

 unwrapMap = <TypeMap>(callBack: (param: Type[0]) => TypeMap): TypeMap[] => {
   return this.containerValue.map(callBack);
 };

 filter = (
   callBack: (param: Type[0]) => Type[0] | boolean
 ): MaybeArray<Type[0][]> => {
   if (this.isNothing() || this.isEmpty()) return new MaybeArray();
   return new MaybeArray<Type[0][]>(this.containerValue.filter(callBack));
 };
 unwrapFilter = (callBack: (param: Type[0]) => Type[0] | boolean): Type[0][] =>
   this.containerValue.filter((item) => callBack(item));

 find = (callBack: (param: Type[0]) => Type[0] | boolean): Maybe<Type[0]> => {
   if (this.isNothing() || this.isEmpty()) return new Maybe();
   return MaybeContainer.from(this.containerValue.find(callBack));
 };
 includes = (value: Type[0]): boolean => {
   if (this.isNothing() || this.isEmpty()) false;
   return this.containerValue.includes(value);
 };
 length = !this.isNothing() && this.containerValue.length;
 isEmpty = () => this.isNothing() || !this.length;
}