import { MaybeContainer } from "./MaybeContainer";

export class MaybeAsync<Type extends Promise<Type>> extends MaybeContainer<
  Promise<Type>
> {
  constructor(inputValue?: Type) {
    super(inputValue);
    if (inputValue && !(inputValue instanceof Promise))
      this.containerValue = Promise.resolve<Type>(inputValue);
  }
  public static async = async <Type extends Promise<Type>>(inputValue: Type) =>
    MaybeContainer.new(await inputValue);
  public unwrapAwait = async () => await this.containerValue;
}
