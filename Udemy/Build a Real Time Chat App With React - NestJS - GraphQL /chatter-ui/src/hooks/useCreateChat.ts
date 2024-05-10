import { graphql } from "../gql";
import { useMutation } from "@apollo/client";
import { ChatFragment } from "../fragments/chat.fragment.ts";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

const useCreateChat = () => {
  return useMutation(createChatDocument, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          chats(existingChats = []) {
            const newChatRef = cache.writeFragment({
              data: data?.createChat,
              fragment: ChatFragment,
              fragmentName: "ChatFragment"
            });

            return [...existingChats, newChatRef];
          }
        }
      });
    }
  });
};

export { useCreateChat };
