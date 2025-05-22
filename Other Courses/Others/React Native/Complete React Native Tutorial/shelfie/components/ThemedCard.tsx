import { StyleSheet, useColorScheme, View, ViewProps } from "react-native";
import { Colors } from "../constants/Colors";
import React from "react";

const ThemedCard = ({ style, children, ...props }: ViewProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <View
      style={[{ backgroundColor: theme.uiBackground }, styles.card, style]}
      {...props}
    >
      {children}
    </View>
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
