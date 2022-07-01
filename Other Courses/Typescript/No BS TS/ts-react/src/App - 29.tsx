import React, { useCallback, useMemo, useRef } from "react";
import { useTodos } from "./useTodos - 29";
import "./App.css";


const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);

const Button: React.FunctionComponent<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement> & {
  title?: string;
}> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "red",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
                 items,
                 render,
                 itemClick,
               }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const initialTodos = useMemo(() => [
    { id: 0, text: "Hey there", done: false },
  ], []);

  const { isEditing, todos, addTodo, removeTodo, startWorking, endWorking } = useTodos(initialTodos);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Introduction"/>
      <Box>Hello there</Box>

      <Heading title="Todos"/>
      {isEditing && (
        <>
          <UL
            items={todos}
            itemClick={(item) => alert(item.id)}
            render={(todo) => (
              <>
                ({todo.done ? "Done" : "Not Done"})
                {todo.text}
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </>
            )}
          />
          <div>
            <input type="text" ref={newTodoRef}/>
            <Button onClick={onAddTodo}>Add Todo</Button>
          </div>
          <Button onClick={startWorking}>Start Working</Button>

        </>
      )}
      {!isEditing && (
        <Button onClick={endWorking}>Stop Working</Button>
      )}
    </div>
  );
}

export default App;
