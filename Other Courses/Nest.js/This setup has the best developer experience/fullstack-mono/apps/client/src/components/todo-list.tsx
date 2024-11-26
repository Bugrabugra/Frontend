import apiClient from "../api-client.ts";

type Props = {
  onItemClick: (id: number) => void;
};

const TodoList = ({ onItemClick }: Props) => {
  const { data, isLoading } = apiClient.todos.getAll.useQuery(["todos"]);

  if (isLoading || !data) {
    return "Loading...";
  }

  return (
    <ol style={{ margin: 0, borderRight: "1px solid white", paddingRight: 20 }}>
      {data.body.map((todo) => (
        <li
          onClick={() => onItemClick(todo.id)}
          style={{ textDecoration: "underline", cursor: "pointer" }}
          key={todo.id}
        >
          {todo.title}
        </li>
      ))}
    </ol>
  );
};

export default TodoList;
