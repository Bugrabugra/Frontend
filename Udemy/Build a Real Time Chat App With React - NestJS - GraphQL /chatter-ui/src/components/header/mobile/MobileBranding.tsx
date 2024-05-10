import Typography from "@mui/material/Typography";
import ForumIcon from "@mui/icons-material/Forum";
import router from "../../Routes.tsx";

const MobileBranding = () => {
  return (
    <>
      <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        onClick={() => router.navigate("/")}
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          cursor: "pointer",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none"
        }}
      >
        CHATTER
      </Typography>
    </>
  );
};

export default MobileBranding;
