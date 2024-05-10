import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql.ts";
import { getMessagesDocument } from "../hooks/useGetMessages.ts";
import { PAGE_SIZE } from "../constants/page-size.ts";

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messagesQueryOptions = {
    query: getMessagesDocument,
    variables: {
      chatId: message.chatId,
      skip: 0,
      limit: PAGE_SIZE
    }
  };

  const messages = cache.readQuery({ ...messagesQueryOptions });

  cache.writeQuery({
    ...messagesQueryOptions,
    data: {
      messages: (messages?.messages || []).concat(message)
    }
  });
};
