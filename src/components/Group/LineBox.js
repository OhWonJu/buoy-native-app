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
import styled from "styled-components/native";
import RowBox from "../RowBox";
import constants from "../../../constants";
import Action from "./Action";

const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.mainColor};
  border-bottom-color: ${(props) => props.theme.lightUtilColor};
  border-bottom-width: 1px;
  /* margin-top: 5px; */
  /* margin-bottom: 5px; */
  /* padding: 5px 0px 5px 0px; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LineName = styled.Text`
  background-color: ${(props) => props.theme.utilColor + 35};
  padding: 3px 8px 3px 8px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  max-width: 30%;
`;

const InfoBox = styled.View`
  width: 70%;
  flex-direction: row;
  justify-content: space-around;
`;
const InfoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 12px;
`;
const InfoMainText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 15px;
  font-weight: bold;
`;
const InfoSubText = styled.Text`
  color: ${(props) => props.theme.subColor + 80};
  font-size: 12px;
`;
const UnitText = styled.Text`
  color: ${(props) => props.theme.subColor + 80};
  font-size: 10px;
`;

const HEIGHT = 65;
const snapPoints = [-constants.windowW, -100, 0];
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

export default LineBox = ({ item, onSwipe }) => {
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
        cond(eq(to, -constants.windowW), set(shouldRemove, 1)),
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
          <Container style={{ height: "100%" }} activeOpacity={1}>
            <LineName numberOfLines={1}>Line {item.name}</LineName>
            <InfoBox>
              <InfoWrapper>
                <InfoSubText>스마트부표</InfoSubText>
                <RowBox style={{ alignItems: "flex-end" }}>
                  <InfoMainText>10</InfoMainText>
                  <UnitText>/10</UnitText>
                </RowBox>
              </InfoWrapper>
              <InfoWrapper>
                <InfoSubText>일반부표</InfoSubText>
                <InfoMainText>50</InfoMainText>
              </InfoWrapper>
              <InfoWrapper>
                <InfoSubText>수용률</InfoSubText>
                <RowBox style={{ alignItems: "flex-end" }}>
                  <InfoMainText>--</InfoMainText>
                  <UnitText>%</UnitText>
                </RowBox>
              </InfoWrapper>
            </InfoBox>
          </Container>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
