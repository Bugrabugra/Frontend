import * as z from 'zod';
import { db } from '../../db';
import { WithId } from 'mongodb';

export const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean().default(false),
});

// const result = Todo.parse({
//   content: '',
// });

export type Todo = z.infer<typeof Todo>;
export type TodoWithId = WithId<Todo>;
export const Todos = db.collection<Todo>('todos');
