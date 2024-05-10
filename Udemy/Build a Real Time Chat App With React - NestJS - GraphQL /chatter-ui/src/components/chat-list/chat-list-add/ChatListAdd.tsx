import { Button, Modal, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useCreateChat } from "../../../hooks/useCreateChat.ts";
import { UNKNOWN_ERROR_MESSAGE } from "../../../constants/errors.ts";
import router from "../../Routes.tsx";

type ChatListAddProps = {
  open: boolean;
  handleClose: () => void;
};

const ChatListAdd = ({ handleClose, open }: ChatListAddProps) => {
  const [error, setError] = useState("");
  const [name, setName] = useState<string | undefined>("");
  const [createChat] = useCreateChat();

  const onClose = () => {
    setError("");
    setName("");
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" component="h2">
            Add Chat
          </Typography>
          <TextField
            label="Name"
            error={!!error}
            helperText={error}
            onChange={(event) => setName(event.target.value)}
          />
          <Button
            variant="outlined"
            onClick={async () => {
              if (!name?.length) {
                setError("Chat name is required.");
                return;
              }

              try {
                const chat = await createChat({
                  variables: {
                    createChatInput: { name }
                  }
                });

                onClose();
                router.navigate(`/chats/${chat.data?.createChat._id}`);
              } catch (error) {
                setError(UNKNOWN_ERROR_MESSAGE);
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChatListAdd;
