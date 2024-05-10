import { graphql } from "../gql";
import { useSubscription } from "@apollo/client";
import { SubscriptionMessageCreatedArgs } from "../gql/graphql.ts";
import { updateMessages } from "../cache/messages.ts";
import { updateLatestMessage } from "../cache/latestMessage.ts";

const messageCreatedDocument = graphql(`
  subscription messageCreated($chatIds: [String!]!) {
    messageCreated(chatIds: $chatIds) {
      ...MessageFragment
    }
  }
`);

export const useMessageCreated = (
  variables: SubscriptionMessageCreatedArgs
) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.messageCreated);
        updateLatestMessage(client.cache, data.data.messageCreated);
      }
    }
  });
};
