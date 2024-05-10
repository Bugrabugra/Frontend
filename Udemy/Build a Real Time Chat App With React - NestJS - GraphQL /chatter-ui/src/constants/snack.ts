import { makeVar } from "@apollo/client";
import { SnackMessage } from "../types/snack-message.type.ts";

export const snackVar = makeVar<SnackMessage | undefined>(undefined);
