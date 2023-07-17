export type CheckMaybeInputType<Type> = Type extends unknown[]
  ? MaybeArray<Type>
  : Type extends Promise<unknown>
  ? MaybeAsync<Type>
  : Maybe<Type>;

export class MaybeContainer<Type> {
  protected containerValue!: Type;
  static from = <TypeValue>(ofInputValue?: TypeValue) =>
    new Maybe(ofInputValue);

  static fromArray = <Type extends unknown[]>(array?: Type) =>
    new MaybeArray(array);

  static async = <Type extends Promise<unknown>>(inputValue?: Type) =>
    new MaybeAsync(inputValue);

  static new = <T>(inputValue?: T): CheckMaybeInputType<T> => {
    return (
      Array.isArray(inputValue)
        ? this.fromArray(inputValue)
        : inputValue instanceof Promise
        ? this.async(inputValue)
        : this.from(inputValue)
    ) as CheckMaybeInputType<T>;
  };

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

export class MaybeAsync<Type extends Promise<unknown>> extends MaybeContainer<Type> {
  constructor(inputValue?: Type) {
    super(inputValue);
    if (inputValue && !(inputValue instanceof Promise))
      this.containerValue = inputValue;
  }
  public resolve = async () => MaybeContainer.new(await this.containerValue);
}

export class MaybeArray<Type extends unknown[]> extends MaybeContainer<Type> {
  constructor(inputValue?: Type) {
    super(inputValue);
    if (inputValue && !Array.isArray(inputValue))
      throw new Error("Not an array");
  }
  map = <TypeMap>(
    callBack: (param: Type[number]) => TypeMap
  ): MaybeArray<TypeMap[]> => {
    if (this.isNothing() || this.isEmpty()) return new MaybeArray();
    return new MaybeArray<TypeMap[]>(this.containerValue.map(callBack));
  };

  unwrapMap = <TypeMap>(
    callBack: (param: Type[number]) => TypeMap
  ): TypeMap[] => {
    return this.containerValue.map(callBack);
  };

  filter = (
    callBack: (param: Type[number]) => Type[number] | boolean
  ): MaybeArray<Type[number][]> => {
    if (this.isNothing() || this.isEmpty()) return new MaybeArray();
    return new MaybeArray<Type[number][]>(this.containerValue.filter(callBack));
  };
  unwrapFilter = (
    callBack: (param: Type[number]) => Type[number] | boolean
  ): Type[number][] => this.containerValue.filter((item) => callBack(item));

  find = (
    callBack: (param: Type[number]) => Type[number] | boolean
  ): MaybeContainer<Type[number]> => {
    if (this.isNothing() || this.isEmpty()) return MaybeContainer.new();
    return MaybeContainer.from(this.containerValue.find(callBack));
  };
  includes = (value: Type[number]): boolean => {
    if (this.isNothing() || this.isEmpty()) false;
    return this.containerValue.includes(value);
  };
  length = !this.isNothing() && this.containerValue.length;
  isEmpty = () => this.isNothing() || !this.length;
}

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
