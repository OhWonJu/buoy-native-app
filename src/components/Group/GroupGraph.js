import React from "react";
import { View, Text } from "react-native";
import constants from "../../../constants";

export default GroupGraph = ({ item }) => {
  return (
    <View
      style={{
        height: 200,
        width: constants.screenW,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Text>{item.title}</Text>
    </View>
  );
};
