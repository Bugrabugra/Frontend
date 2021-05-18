type ID = string;
type PopularTag = string;
type MaybePopularTag = PopularTag | null;

interface UserInterface1 {
  id: ID;
  name: string;
  surname: string;
}

const popularTags: PopularTag[] = ["dragon", "coffee"];
const dragonsTag: MaybePopularTag = "string";

let userName: string = "alex";

let pageName: string | number = "1";

let errorMessage: string | null = null;

// @ts-ignore
let user: UserInterface1 | null = null;

let someProp: string | number | null | undefined | string[] | object