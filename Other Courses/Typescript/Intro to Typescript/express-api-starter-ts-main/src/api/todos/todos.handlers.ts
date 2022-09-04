import { Todo, Todos, TodoWithId } from './todos.model';
import { NextFunction, Request, Response } from 'express';
import { InsertOneResult } from 'mongodb';
import { ZodError } from 'zod';

export async function findAll(req: Request, res: Response<TodoWithId[]>, next: NextFunction) {
  try {
    const result = await Todos.find();
    const todos = await result.toArray();
    res.json(todos);
  } catch (error) {
    next(error);
  }
}

export async function createOne(req: Request<{}, InsertOneResult<Todo>, Todo>, res: Response<InsertOneResult<Todo>>, next: NextFunction) {
  try {
    const validateResult = Todo.parse(req.body);
    const insertResult = await Todos.insertOne(validateResult);
    res.json(insertResult);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(422);
    }
    next(error);
  }
}
