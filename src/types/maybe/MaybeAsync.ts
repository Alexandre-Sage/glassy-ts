/* import { Maybe } from "./MaybeContainer";

export class MaybeAsync<Type extends Promise<unknown>> extends Maybe<Type> {
  constructor(inputValue?: Type) {
    super(inputValue);
    if (inputValue && !(inputValue instanceof Promise))
      this.containerValue = inputValue;
  }
  public resolve = async () => Maybe.new(await this.containerValue);
}
 */