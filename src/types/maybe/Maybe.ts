import { MaybeContainer } from "./MaybeContainer";

export class Maybe<Type> extends MaybeContainer<Type> {
  constructor(inputValue?: Type) {
    super(inputValue);
  }
  public isNothing = () =>
    this.containerValue === null || this.containerValue === undefined;

  public map = <TypeMap>(
    callBack: (param: Type) => TypeMap
  ): MaybeContainer<TypeMap> => {
    if (this.isNothing()) return new MaybeContainer();
    return MaybeContainer.new<TypeMap>(callBack(this.containerValue));
  };
  public unwrapMap = <TypeMap>(callBack: (param: Type) => TypeMap): TypeMap =>
    callBack(this.containerValue);
}
