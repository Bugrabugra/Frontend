import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { updateMessages } from "../cache/messages.ts";
import { updateLatestMessage } from "../cache/latestMessage.ts";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = () => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage);
        updateLatestMessage(cache, data.createMessage);
      }
    }
  });
};

export { useCreateMessage };
