import React, { useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { Path } from "react-native-svg";
import { mix } from "react-native-redash";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default Wave = ({ index, color, wavy }) => {
  const progress1 = useSharedValue(0);
  const progress2 = useSharedValue(0);

  useEffect(() => {
    const duration = 800;
    const timingOptions = { duration: duration };
    const pulse = withTiming(1, timingOptions);
    const repeated = withRepeat(pulse, -1, true);
    progress1.value = withDelay(index * 300, repeated);
    progress2.value = withDelay((index * 300 + duration) / 2, repeated);
  }, []);

  // c -> y -> 0.5 -> 0 -> 1
  const data = useDerivedValue(() => {
    return {
      from: {
        x: 0,
        y: 0.5,
      },
      c1: { x: 0.25, y: mix(progress1.value, 1 - wavy / 4, 1 - wavy) },
      c2: { x: 0.75, y: mix(progress2.value, 1 - wavy / 4, 1 - wavy) },
      to: { x: 1, y: 0.5 },
    };
  });

  const path = useAnimatedProps(() => {
    const { from, c1, c2, to } = data.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });

  return <AnimatedPath fill={color} animatedProps={path} />;
};
