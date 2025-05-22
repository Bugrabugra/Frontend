import React from "react";

import { useColorScheme, View, ViewProps } from "react-native";
import { Colors } from "../constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemedViewProps = {
  safe?: boolean;
} & ViewProps;

const ThemedView = ({
  style,
  children,
  safe = false,
  ...props
}: ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;
  const insets = useSafeAreaInsets();

  if (!safe) {
    return (
      <View style={[{ backgroundColor: theme.background }, style]} {...props}>
        {children}
      </View>
    );
  }

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedView;
