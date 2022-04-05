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

export default Wave = ({ totalWave, index, color, wavy }) => {
  const progress1 = useSharedValue(0);
  const progress2 = useSharedValue(0);

  useEffect(() => {
    const duration = 900;
    const timingOptions = { duration: duration };
    const pulse = withTiming(1, timingOptions);
    const repeated = withRepeat(pulse, -1, true);
    progress1.value = withDelay(index * (duration / totalWave), repeated);
    progress2.value = withDelay(index * (2 * (duration / totalWave)), repeated);
  }, []);

  // c -> y -> 0.5 -> 0 -> 1
  const data = useDerivedValue(() => {
    const baseHeight = 0.8 - 0.1 * wavy;
    return {
      from: {
        x: 0,
        y: baseHeight,
      },
      c1: {
        x: 0.25,
        // 웨이브값이 작을수록 1과 0사이가 작아야...
        // 1 - 는 작아지고 0 + 는 커져야??
        // 0.5에 가깝게?
        y: mix(
          progress1.value,
          baseHeight + wavy * 0.1,
          baseHeight - wavy * 0.1
        ),
      },
      c2: {
        x: 0.75,
        y: mix(
          progress2.value,
          baseHeight + wavy * 0.1,
          baseHeight - wavy * 0.1
        ),
      },
      to: { x: 1, y: baseHeight },
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
