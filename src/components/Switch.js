import React, { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const PADDING = 2;

export default Switch = ({ size, value, onValueChange }) => {
  const [toggle, setToggle] = useState(0);

  useEffect(() => {
    setToggle(value);
  }, [value]);

  // console.log("==============");
  // console.log("value", value);
  // console.log("toggle", toggle);

  const progress = useDerivedValue(() => {
    return withTiming(toggle);
  }, [toggle]);

  // const firstRender = useRef(true);
  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   } else {
  //     onValueChange(toggle);
  //   }
  // }, [toggle]);

  const PanGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      //   translateX.value = event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX < -(size - size / 2)) {
        runOnJS(onValueChange)(0);
        runOnJS(setToggle)(0);
        // progress.value = withTiming(0);
      }
      if (event.translationX > size - size / 2) {
        runOnJS(onValueChange)(1);
        runOnJS(setToggle)(1);
      }
    },
  });

  const handler = useCallback(() => {
    setToggle(toggle === 1 ? 0 : 1);
    onValueChange(toggle === 1 ? 0 : 1);
  });

  const color = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["#E1E1E1", "#7FA7D3"]
    );
    return {
      backgroundColor,
    };
  });
  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, size * 1 - PADDING * 2]
          ),
        },
        // { translateX: translateX.value },
      ],
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: size * 2,
          padding: PADDING,
          borderRadius: 80,
        },
        color,
      ]}
    >
      <TouchableOpacity onPress={() => handler()} activeOpacity={1}>
        <PanGestureHandler onGestureEvent={PanGestureEvent}>
          <Animated.View
            style={[
              {
                height: size,
                width: size,
                backgroundColor: "#FBFBFB",
                borderRadius: size / 2,
              },
              circleAnimatedStyle,
            ]}
          />
        </PanGestureHandler>
      </TouchableOpacity>
    </Animated.View>
  );
};
