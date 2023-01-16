import {z} from "zod"

const makeZodSafeFetch = <TData>(
  url: string,
  schema: z.Schema<TData>
): Promise<TData> => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return schema.parse(res);
    })
};

const result5 = makeZodSafeFetch("/api/endpoint", z.object({
  firstName: z.string(),
  lastName: z.string(),
  id: z.string()
})).then((res) => {
  console.log(res);
});
