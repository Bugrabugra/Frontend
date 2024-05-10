import ChatListItem from "./chat-list-item/ChatListItem.tsx";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader.tsx";
import Divider from "@mui/material/Divider";
import { useEffect, useState } from "react";
import ChatListAdd from "./chat-list-add/ChatListAdd.tsx";
import { useGetChats } from "../../hooks/useGetChats.ts";
import { usePath } from "../../hooks/usePath.ts";
import { useMessageCreated } from "../../hooks/useMessageCreated.ts";
import { PAGE_SIZE } from "../../constants/page-size.ts";
import Box from "@mui/material/Box";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats.ts";

export default function ChatList() {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data, fetchMore } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE
  });
  const { path } = usePath();
  const { chatsCount, countChats } = useCountChats();

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    countChats();
  }, [countChats]);

  useEffect(() => {
    const pathSplit = path.split("chats/");

    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto"
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({ variables: { skip: data?.chats.length } })
            }
            hasMore={
              data?.chats && chatsCount ? data.chats.length < chatsCount : false
            }
            useWindow={false}
          >
            {data?.chats &&
              [...data.chats]
                .sort((chatA, chatB) => {
                  if (!chatA.latestMessage) {
                    return -1;
                  }

                  return (
                    new Date(chatA.latestMessage?.createdAt).getTime() -
                    new Date(chatB.latestMessage?.createdAt).getTime()
                  );
                })
                .map((chat) => (
                  <ChatListItem
                    key={chat._id}
                    chat={chat}
                    selected={chat._id === selectedChatId}
                  />
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}
