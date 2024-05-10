import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls.ts";
import { snackVar } from "../constants/snack.ts";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors.ts";

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);

    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return;
    }

    const { messages } = await res.json();

    setMessagesCount(messages);
  }, [chatId]);

  return { messagesCount, countMessages };
};

export { useCountMessages };
