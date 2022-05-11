import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, themeColor } from "react-native-rapi-ui";

const ActionBarImage = () => {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={require("../assets/icon.png")}
        style={{
          width: 40,
          height: 40,
          //borderRadius: 40 / 2,
          marginRight: 10,
        }}
      />
    </View>
  );
};

export default ActionBarImage;
