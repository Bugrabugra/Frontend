import { Image, useColorScheme } from "react-native";

const ThemedLogo = ({ ...props }) => {
  const colorScheme = useColorScheme();

  const logo =
    colorScheme === "dark"
      ? require("../assets/img/logo_dark.png")
      : require("../assets/img/logo_light.png");

  return <Image source={logo} {...props} />;
};

export default ThemedLogo;
