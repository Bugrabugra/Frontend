import { ActivityIndicator, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

import ThemedView from "./ThemedView";

const ThemedLoader = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={theme.text} />
    </ThemedView>
  );
};

export default ThemedLoader;
