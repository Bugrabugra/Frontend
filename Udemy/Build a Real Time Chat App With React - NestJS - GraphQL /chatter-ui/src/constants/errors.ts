import { SnackMessage } from "../types/snack-message.type.ts";

const UNKNOWN_ERROR_MESSAGE =
  "An unknown error has occurred. Please try again later.";

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error"
};

export { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_SNACK_MESSAGE };
