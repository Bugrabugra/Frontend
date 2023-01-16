// you can pass types to other types!
type MyGenericType<TData> = {
  data: TData;
};

type Example1 = MyGenericType<{
  firstName: string
}>;

type Example2 = MyGenericType<number>;
