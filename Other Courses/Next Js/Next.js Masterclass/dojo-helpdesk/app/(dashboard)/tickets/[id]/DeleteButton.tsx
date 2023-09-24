"use client";

import { useTransition } from "react";
import { TiDelete } from "react-icons/ti";
import { deleteTicket } from "@/app/(dashboard)/tickets/actions";

type DeleteButtonProps = {
  id: string | undefined
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  // const router = useRouter();
  // const [isLoading, setIsLoading] = useState(false);

  // const handleClick = async () => {
  //   setIsLoading(true);
  //
  //   const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
  //     method: "DELETE"
  //   });
  //
  //   const json = await res.json();
  //
  //   if (json.error) {
  //     console.log(json.error);
  //     setIsLoading(false);
  //   } else {
  //     router.refresh();
  //     router.push("/tickets");
  //   }
  // };

  return (
    <button
      className="btn-primary"
      // onClick={handleClick}
      onClick={() => startTransition(() => deleteTicket(id))}
      // disabled={isLoading}
      disabled={isPending}
    >
      {
        // isLoading
        isPending ?
          <><TiDelete />Deleting...</> :
          <><TiDelete />Delete Ticket</>}
    </button>
  );
};

export default DeleteButton;
