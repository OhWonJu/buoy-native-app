import React from "react";
import { View } from "react-native";

export default RowBox = ({ style, children }) => (
  <View style={{ flexDirection: "row", ...style }}>{children}</View>
);
