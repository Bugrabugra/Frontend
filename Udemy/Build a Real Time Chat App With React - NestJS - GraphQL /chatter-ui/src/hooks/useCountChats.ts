import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls.ts";
import { snackVar } from "../constants/snack.ts";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors.ts";

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await fetch(`${API_URL}/chats/count`);

    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return;
    }

    setChatsCount(parseInt(await res.text()));
  }, []);

  return { chatsCount, countChats };
};

export { useCountChats };
