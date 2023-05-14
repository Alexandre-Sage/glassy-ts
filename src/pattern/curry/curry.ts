
const curry =
  <T1, T2, T3>(functionToCur: (p1: T1, p2: T2) => T3) =>
  (p1: T1) =>
  (p2: T2) =>
    functionToCur(p1, p2);
export { curry };