/* import { Maybe } from "./MaybeContainer";

export class MaybeSimple<Type> extends Maybe<Type> {
  constructor(inputValue?: Type) {
    super(inputValue);
  }
  public isNothing = () =>
  this.containerValue === null || this.containerValue === undefined;
  
  public map = <TypeMap>(
    callBack: (param: Type) => TypeMap
    ): Maybe<TypeMap> => {
      if (this.isNothing()) return new Maybe();
      return Maybe.new<TypeMap>(callBack(this.containerValue));
    };
    public unwrapMap = <TypeMap>(callBack: (param: Type) => TypeMap): TypeMap =>
    callBack(this.containerValue);
  }
   */