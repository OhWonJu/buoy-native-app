import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  min,
  not,
  set,
  useCode,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
// import { snapPoint } from "react-native-redash";
import {
  usePanGestureHandler,
  timing,
  useClock,
  useValue,
  minus,
  clamp,
  snapPoint,
} from "react-native-redash/lib/module/v1";
import constants from "../../../constants";
import Action from "./Action";

// const HEIGHT = 65;
// const snapPoints = [-constants.windowW, -100, 0]; // 스윕으로 삭제
const snapPoints = [-100, 0];
const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E1E2E3",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default SwipeWrapper = ({ onSwipe, children, HEIGHT = 65 }) => {
  const { gestureHandler, translation, velocity, state } =
    usePanGestureHandler();

  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const deleteOpacity = useValue(1);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, snapPoints);
  const shouldRemove = useValue(0);

  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        // set(translateX, add(offsetX, min(translation.x, 0)))
        set(
          translateX,
          add(offsetX, clamp(translation.x, -9999, minus(offsetX)))
        )
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({ clock, from: translateX, to })),
        set(offsetX, translateX),
        // cond(eq(to, -constants.windowW), set(shouldRemove, 1)), // 스윕으로 삭제
      ]),
      cond(shouldRemove, [
        set(height, timing({ from: HEIGHT, to: 0 })),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], onSwipe)),
      ]),
    ],
    [onSwipe]
  );

  return (
    <Animated.View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
          <Action x={abs(translateX)} {...{ deleteOpacity }} height={HEIGHT} />
        </TouchableWithoutFeedback>
      </View>
      <PanGestureHandler
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
        {...gestureHandler}
      >
        <Animated.View style={{ height, transform: [{ translateX }] }}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
