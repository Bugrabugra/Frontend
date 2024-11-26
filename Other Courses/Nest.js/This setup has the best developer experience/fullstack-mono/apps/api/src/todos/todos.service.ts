import { Injectable } from "@nestjs/common";
import { Todo } from "api-contract";

@Injectable()
export class TodosService {
  todos: Todo[] = [
    { id: 1, title: "Task A", description: "get A done!" },
    { id: 2, title: "Task B", description: "get B done!" },
    { id: 3, title: "Task C", description: "get C done!" },
  ];

  create(todo: Omit<Todo, "id">) {
    const newTodo = {
      ...todo,
      id: Date.now(),
    };
    this.todos.push(newTodo);

    return newTodo;
  }

  getAll(title?: string) {
    if (title) {
      return this.todos.filter((todo) => {
        return todo.title.toLowerCase().includes(title.toLowerCase());
      });
    }

    return this.todos;
  }

  getOne(id: number) {
    return this.todos.find((todo) => {
      return todo.id === id;
    });
  }

  update(id: number, dto: { title?: string; description?: string }) {
    const index = this.todos.findIndex((todo) => {
      return todo.id === id;
    });

    if (index === -1) {
      return null;
    }

    this.todos[index] = {
      ...this.todos[index],
      ...dto,
    };

    return this.todos[index];
  }

  remove(id: number) {
    const index = this.todos.findIndex((todo) => {
      return todo.id === id;
    });

    if (index === -1) {
      return null;
    }

    this.todos = this.todos.filter((todo) => {
      return todo.id !== id;
    });

    return {};
  }
}
