import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../api-client.ts";
import { Todo } from "api-contract";

type Props = Todo;

const SaveTodo = ({ id, ...todo }: Props) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = apiClient.todos.update.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  const handleSave = () => {
    mutate({ params: { id }, body: todo });
  };

  return (
    <button disabled={isPending} onClick={handleSave}>
      {isPending ? "..." : "Save"}
    </button>
  );
};

export default SaveTodo;
