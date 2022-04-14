import React, { useRef, useEffect } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
  withDelay,
  withRepeat,
  useAnimatedProps,
  Easing,
  Extrapolate,
} from "react-native-reanimated";
import Svg, { G, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default DonutChart = ({
  percentage = 80,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = "tomato",
  delay = 100,
  textColor,
  max = 100,
}) => {
  const halfCircle = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const animated = useSharedValue(0);

  useEffect(() => {
    const pulse = withTiming(percentage, {
      duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    // const repeated = withRepeat(pulse, -1, true);
    animated.value = withDelay(delay, pulse);
  }, []);

  const offset = useDerivedValue(() => {
    const maxPerc = (100 * animated.value) / max;
    return circumference - (circumference * maxPerc) / 100;
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: offset.value,
    };
  });

  const animatedInputProps = useAnimatedProps(() => {
    return {
      text: parseInt((100 * animated.value) / max).toString() + "%",
    };
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={textColor ?? color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.3}
          />
          <AnimatedCircle
            animatedProps={animatedProps}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circumference}
            // strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        animatedProps={animatedInputProps}
        underlineColorAndroid={"transparent"}
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {
            fontSize: radius / 2,
            color: textColor ?? color,
          },
          {
            fontWeight: "bold",
            textAlign: "center",
          },
        ]}
      />
      {/* <Text>{perc.value}</Text> */}
    </View>
  );
};
