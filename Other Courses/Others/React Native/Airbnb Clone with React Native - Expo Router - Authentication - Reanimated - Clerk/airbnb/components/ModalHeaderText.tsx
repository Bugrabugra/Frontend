import { Color } from "ansi-fragments/build/fragments/Color";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Colors from "@/constants/Colors";

const STAYS = "stays";
const EXPERIENCES = "experiences";

const ModalHeaderText = () => {
  const [active, setActive] = useState(STAYS);

  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      <TouchableOpacity onPress={() => setActive(STAYS)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === STAYS ? "#000" : Colors.grey,
            textDecorationLine: active === STAYS ? "underline" : "none",
          }}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(EXPERIENCES)}>
        <Text
          style={{
            fontFamily: "mon-sb",
            fontSize: 18,
            color: active === EXPERIENCES ? "#000" : Colors.grey,
            textDecorationLine: active === EXPERIENCES ? "underline" : "none",
          }}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalHeaderText;
