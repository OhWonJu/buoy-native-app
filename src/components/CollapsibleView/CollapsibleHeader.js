import React from "react";
import { View, StyleSheet, Text, Animated } from "react-native";

export default CollapsibleHeader = ({
  onLayout,
  headerTranslateY,
  children,
}) => {
  return (
    <Animated.View
      onLayout={onLayout}
      pointerEvents="box-none"
      style={{
        position: "absolute",
        transform: [{ translateY: headerTranslateY }],
      }}
    >
      {children}
    </Animated.View>
  );
};
