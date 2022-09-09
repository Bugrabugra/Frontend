import { Equal, Expect } from "./helpers/type-utils";
import { string } from "zod";

/**
 * Here, the id property is shared between all three
 * interfaces. Can you find a way to refactor this to
 * make it more DRY?
 */

interface IId {
  id: string;
}

interface User extends IId {
  firstName: string;
  lastName: string;
}

interface Post extends IId {
  title: string;
  body: string;
}

interface Comment extends IId {
  comment: string;
}

type tests = [
  Expect<Equal<User, { id: string; firstName: string; lastName: string }>>,
  Expect<Equal<Post, { id: string; title: string; body: string }>>,
  Expect<Equal<Comment, { id: string; comment: string }>>,
];
