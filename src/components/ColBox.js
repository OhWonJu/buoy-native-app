import React from "react";
import { View } from "react-native";

export default RowBox = ({ style, children }) => (
  <View style={{ justifyContent: "center", alignContent: "center", ...style }}>
    {children}
  </View>
);
