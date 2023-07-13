declare const curryAsync: <T1, T2, T3>(functionToCur: (p1: T1, p2: T2) => Promise<T3>) => (p1: T1) => (p2: T2) => Promise<T3>;
export { curryAsync };
