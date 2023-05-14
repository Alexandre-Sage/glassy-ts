import { MaybeContainer } from "./MaybeContainer";

export class MaybeAsync<Type extends Promise<Type>> extends MaybeContainer<Promise<Type>> {
 constructor(inputValue?: Type) {
   super(inputValue);
   if(inputValue && !(inputValue instanceof Promise)) this.containerValue = Promise.resolve<Type>(inputValue)
 }
 public unwrapAwait= async () => await this.containerValue;
}