import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import styled from "styled-components/native";
import constants from "../../../constants";

const BlurGround = styled(Animated.View)`
  /* flex: 1; */
  /* min-height: 100%; */
  /* min-width: 100%; */
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0);
`;
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 3;
  /* background-color: rgba(0, 0, 0, 0.25); */
`;
const ModalView = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  height: ${constants.windowH * 0.5}px;
  width: 90%;
`;
const ModalContextBox = styled.View`
  flex: 1;
  width: 100%;
  padding: 20px;
  justify-content: space-around;
`;
const ModalContextText = styled.Text`
  padding: 5px 0px 5px 0px;
  color: ${(props) =>
    props.focused ? props.theme.idnColor : props.theme.subColor};
  font-weight: ${(props) => (props.focused ? "bold" : "normal")};
`;

const ModalButtonBox = styled.View`
  height: 50px;
  width: 100%;
  padding: 0px 10px 0px 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-style: solid;
  border-top-color: ${(props) => props.theme.lightUtilColor};
  border-top-width: 1px;
`;
const ModalButton = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 10px;
`;

const ModalButtonText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.lightUtilColor};
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
`;

export default BouyEditModal = ({
  modalVisible,
  setModalVisible,
  setData,
  confirm = () => null,
  cancel = () => null,
  _buoy_list,
  _history,
  _line_info,
}) => {
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

  return (
    <>
      <BlurGround style={BlurAnimeStyle} />
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Container>
          <ModalView>
            <ModalContextBox>
              <ModalContextText>Line {_line_info?.line}</ModalContextText>
              <ModalContextText>스마트 부표</ModalContextText>
              <TextInput
                defaultValue={_buoy_list?.length.toString()}
                keyboardType={"number-pad"}
                returnKeyType={"done"}
                width={"66%"}
              />
              <ModalContextText>일반 부표</ModalContextText>
              <TextInput
                defaultValue={_buoy_list?.length.toString()}
                keyboardType={"number-pad"}
                returnKeyType={"done"}
                width={"66%"}
              />
            </ModalContextBox>
            <ModalButtonBox>
              <ModalButton
                onPress={() => {
                  setModalVisible(false);
                  cancel();
                }}
                style={{ borderRightColor: "#EFEFEF", borderRightWidth: 1 }}
              >
                <ModalButtonText>확인</ModalButtonText>
              </ModalButton>
              <ModalButton
                onPress={() => {
                  setModalVisible(false);
                  cancel();
                }}
              >
                <ModalButtonText>취소</ModalButtonText>
              </ModalButton>
            </ModalButtonBox>
          </ModalView>
        </Container>
      </Modal>
    </>
  );
};
