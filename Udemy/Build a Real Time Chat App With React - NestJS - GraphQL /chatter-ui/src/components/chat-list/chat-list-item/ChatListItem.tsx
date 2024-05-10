import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ListItemButton } from "@mui/material";
import router from "../../Routes.tsx";
import { Chat } from "../../../gql/graphql.ts";
import Box from "@mui/material/Box";
import "./ChatListItem.css";

type ChatListProps = {
  chat: Chat;
  selected: boolean;
};

const ChatListItem = ({ chat, selected }: ChatListProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton
          onClick={() => router.navigate(`/chats/${chat._id}`)}
          selected={selected}
        >
          <ListItemAvatar>
            <Avatar src={chat.latestMessage?.user.imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "0.5rem"
                }}
              >
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.latestMessage?.user.username ?? ""}
                </Typography>

                <div className="content">
                  {" " + (chat.latestMessage?.content ?? "")}
                </div>
              </Box>
            }
          />
        </ListItemButton>
      </ListItem>

      <Divider variant="inset" />
    </>
  );
};

export default ChatListItem;
