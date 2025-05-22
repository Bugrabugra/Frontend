import { TextInput, TextInputProps, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export default function ThemedTextInput({ style, ...props }: TextInputProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    />
  );
}
