type ArrayLength<T extends any[]> = T extends { length: infer L } ? L : never;
type ArrayInsideType<T> = T extends (infer U)[] ? U : T;
type DropFirstInArray<T extends any[]> = T extends [arg: any, ...rest: infer U]
  ? U
  : T;
type LastInArray<T extends any[]> = T[ArrayLength<DropFirstInArray<T>>];

export {
 ArrayInsideType,
 DropFirstInArray,
 LastInArray,
 ArrayLength
};
