type KeyValueSplitter<T extends string> = T extends `${infer K}:${infer V}`
  ? { key: K; value: V }
  : T extends `${infer K}.${infer V}`
    ? { resource: K; subresource: V }
    : never;

type A = KeyValueSplitter<"foo.bar">;
