import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  divide,
  interpolateNode,
  Extrapolate,
  sub,
  cond,
  add,
  lessThan,
  multiply,
  useDerivedValue,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  remove: {
    color: "white",
    // fontFamily: "UberMoveMedium",
    fontSize: 14,
  },
});

const Action = ({ x, deleteOpacity, height }) => {
  const size = cond(lessThan(x, height), x, add(x, sub(x, height)));
  const translateX = cond(lessThan(x, height), 0, divide(sub(x, height), 2));
  const borderRadius = divide(size, 2);
  const scale = interpolateNode(size, {
    inputRange: [20, 30],
    outputRange: [0.001, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  // reanime1 -> 2 마이그레이션 이슈임.
  const iconOpacity = interpolateNode(size, {
    inputRange: [height - 10, height + 10],
    outputRange: [1, 0],
  });
  const textOpacity = sub(1, iconOpacity);

  return (
    <Animated.View
      style={{
        backgroundColor: "#eb2f06",
        justifyContent: "center",
        alignItems: "center",
        height: size,
        width: size,
        borderRadius,
        transform: [{ translateX }],
      }}
    >
      <Animated.View
        style={{
          height: 3,
          width: 20,
          backgroundColor: "white",
          opacity: iconOpacity,
          transform: [{ scale }],
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          opacity: multiply(textOpacity, deleteOpacity),
        }}
      >
        <Text style={styles.remove}>삭제</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Action;
