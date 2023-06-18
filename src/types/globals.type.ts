type ObjectValue<T> = T[keyof T];
type ObjectKeysToArray<T> = (keyof T)[];

type CamelCaseToSnakeCaseTypeKeys<T extends string> =
  T extends `${infer FirstWord}${infer UpperCaseWords}`
    ? `${FirstWord extends Lowercase<FirstWord>
        ? FirstWord
        : `_${Lowercase<FirstWord>}`}${CamelCaseToSnakeCaseTypeKeys<UpperCaseWords>}`
    : T;
type ObjectKeysCamelCaseToSnakeCaseTypeMapper<Object> = {
  [Property in keyof Object as CamelCaseToSnakeCaseTypeKeys<
    Property & string
  >]: Object[Property];
};

export {
  ObjectKeysToArray,
  ObjectValue,
  CamelCaseToSnakeCaseTypeKeys,
  ObjectKeysCamelCaseToSnakeCaseTypeMapper,
};
