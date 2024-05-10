import { Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetMe } from "../../hooks/useGetMe.ts";
import Avatar from "@mui/material/Avatar";
import { UploadFile } from "@mui/icons-material";
import { API_URL } from "../../constants/urls.ts";
import { snackVar } from "../../constants/snack.ts";

const Profile = () => {
  const me = useGetMe();

  const handleFileUpload = async (event: any) => {
    try {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      const res = await fetch(`${API_URL}/users/image`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Image upload filed.");
      }
      snackVar({ message: "Image uploaded.", type: "success" });
    } catch (error) {
      snackVar({ message: "Error uploading file.", type: "error" });
    }
  };

  return (
    <Stack
      spacing={6}
      sx={{
        marginTop: "2.5rem",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography variant="h1">{me?.data?.me.username}</Typography>
      <Avatar sx={{ width: 256, height: 256 }} src={me.data?.me.imageUrl} />
      <Button
        component="label"
        variant="contained"
        size="large"
        startIcon={<UploadFile />}
      >
        Upload Image
        <input type="file" hidden onChange={handleFileUpload} />
      </Button>
    </Stack>
  );
};

export default Profile;
