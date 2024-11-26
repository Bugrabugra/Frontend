import { Todo } from "api-contract";
import { useQueryClient } from "@tanstack/react-query";
import apiClient from "../api-client.ts";

type Props = {
  id: Todo["id"];
  setActive: (id: number | null) => void;
};

const DeleteTodo = ({ id, setActive }: Props) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = apiClient.todos.remove.useMutation({
    onSuccess: () => {
      setActive(null);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  const handleDelete = () => {
    mutate({ params: { id }, body: {} });
  };

  return (
    <button disabled={isPending} onClick={handleDelete}>
      {isPending ? "..." : "Delete"}
    </button>
  );
};

export default DeleteTodo;
