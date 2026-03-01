// DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.
export type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

// DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
export type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};

// UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.
export type UpperCaseKeys<T> = {
    [K in keyof T as Uppercase<string & K>]: T[K];
};

// тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.
export type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: TypedPropertyDescriptor<T[K]>;
};