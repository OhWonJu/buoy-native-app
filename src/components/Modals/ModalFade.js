import React from "react";
import styled from "styled-components/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

const BlurGround = styled(Animated.View)`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0);
`;

export default ModalFade = ({ modalVisible }) => {
  const animationKey = useDerivedValue(() => (modalVisible ? 1 : 0));
  const BlurZIndex = useDerivedValue(() => {
    return interpolate(animationKey.value, [0, 1], [-1, 2], Extrapolate.CLAMP);
  });
  const BlurOpacity = useDerivedValue(() => {
    return interpolate(
      animationKey.value,
      [0, 1],
      [0, 0.25],
      Extrapolate.CLAMP
    );
  });
  const BlurAnimeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(BlurOpacity.value, {
        duration: 200,
        easing: Easing.ease,
      }),
      zIndex: BlurZIndex.value,
    };
  });

  return <BlurGround style={BlurAnimeStyle} />;
};
