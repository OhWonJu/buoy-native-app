import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  divide,
  interpolate,
  Extrapolate,
  sub,
  cond,
  add,
  lessThan,
  multiply,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  remove: {
    color: "white",
    // fontFamily: "UberMoveMedium",
    fontSize: 14,
  },
});

const Action = ({ x, deleteOpacity, height }) => {
  return (
    <Animated.View
      style={{
        backgroundColor: "#eb2f06",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View
        style={{
          height: 5,
          width: 20,
          backgroundColor: "white",
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.remove}>Remove</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default Action;
