import { useQueryClient } from "@tanstack/react-query";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import apiClient from "../api-client.ts";

const CreateTodo = () => {
  const queryClient = useQueryClient();
  const [values, setValues] = useState({ title: "", description: "" });
  const { isPending, mutate } = apiClient.todos.create.useMutation({
    onSuccess: () => {
      setValues({
        title: "",
        description: ""
      });

      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    mutate({ body: values });
  };

  return (
    <div style={{ width: 300 }}>
      <h3 style={{ marginTop: 0 }}>Create</h3>
      <form
        style={{ display: "flex", justifyContent: "space-between" }}
        onSubmit={handleSubmit}
      >
        Title:{" "}
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          disabled={isPending}
        />
        <div style={{ display: "flex", gap: 5 }}>
          <button>Add</button>
        </div>
      </form>
      Description:{" "}
      <input
        type="text"
        name="description"
        value={values.description}
        onChange={handleChange}
        disabled={isPending}
      />
    </div>
  );
};

export default CreateTodo;
