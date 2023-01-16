type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

type Result = GetPromiseReturnType<() => Promise<{
  firstName: string;
  lastName: string;
  id: string;
}>>;

type ErrorLine = GetPromiseReturnType<string>;
