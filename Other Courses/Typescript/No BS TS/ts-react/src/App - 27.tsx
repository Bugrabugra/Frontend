import React, { useCallback, useRef } from "react";
import { useTodos } from "./useTodos - 27";
import "./App.css";
import store, { addTodo, removeTodo, selectTodos } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => (
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
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current.value));
      newTodoRef.current.value = "";
    }
  }, [dispatch]);

  return (
    <div>
      <Heading title="Introduction"/>
      <Box>Hello there</Box>

      <Heading title="Todos"/>
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef}/>
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}

const JustTheTodos = () => {
  const todos = useSelector(selectTodos);

  return (
    <UL
      items={todos}
      itemClick={(item) => {
      }}
      render={(todo) => <>{todo.text}</>}
    />
  )
}

const AppWrapper = () => (
  <Provider store={store}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App/>
      <JustTheTodos/>
    </div>
  </Provider>
);

export default AppWrapper;
