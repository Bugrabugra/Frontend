import { ChangeEventHandler, useEffect, useState } from "react";
import apiClient from "../api-client.ts";
import SaveTodo from "./save-todo.tsx";
import DeleteTodo from "./delete-todo.tsx";

type Props = {
  id: number;
  setActive: (id: number | null) => void;
};

const TodoItem = ({ id, setActive }: Props) => {
  const [values, setValues] = useState({ title: "", description: "" });
  const { data, isLoading } = apiClient.todos.getOne.useQuery(["todos", id], {
    params: { id }
  });

  useEffect(() => {
    if (data) {
      setValues(data.body);
    }
  }, [data]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  if (isLoading || !data) {
    return "Loading...";
  }

  return (
    <div style={{ width: 350 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        Title:{" "}
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
        />
        <div style={{ display: "flex", gap: 5 }}>
          <SaveTodo {...values} id={id} />
          <DeleteTodo id={id} setActive={setActive} />
        </div>
      </div>
      Description:{" "}
      <input
        type="text"
        name="description"
        value={values.description}
        onChange={handleChange}
      />
    </div>
  );
};

export default TodoItem;
