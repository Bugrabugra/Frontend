import { Text, TextProps, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

type ThemedTextProps = {
  title?: boolean;
} & TextProps;

const ThemedText = ({
  style,
  children,
  title = false,
  ...props
}: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  const textColor = title ? theme.title : theme.text;

  return (
    <Text style={[{ color: textColor }, style]} {...props}>
      {children}
    </Text>
  );
};

export default ThemedText;
