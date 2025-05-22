import { View, ViewStyle } from "react-native";

type SpacerProps = {
  width?: ViewStyle["width"];
  height?: ViewStyle["height"];
};

const Spacer = ({ width = "100%", height = 40 }: SpacerProps) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
