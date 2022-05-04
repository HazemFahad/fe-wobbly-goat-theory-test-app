import React from "react";

import { View, Image } from "react-native";

const ActionBarImage = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={require("../assets/test.png")}
        style={{
          width: 60,
          height: 60,
          //   borderRadius: 40 / 2,
          marginRight: 10,
        }}
      />
    </View>
  );
};

export default ActionBarImage;
