import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import styled from "styled-components/native";

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
  justify-content: flex-end;
  align-items: center;
  z-index: 3;
  /* background-color: rgba(0, 0, 0, 0.25); */
`;
const ModalView = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: center;
  height: 40%;
  width: 100%;
`;
const ModalContextBox = styled.View`
  height: 85%;
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
  height: 15%;
  width: 100%;
  padding: 10px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-style: solid;
  border-top-color: ${(props) => props.theme.lightUtilColor};
  border-top-width: 1px;
`;
const ModalButtonText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-weight: bold;
`;

export default TypeModal = ({
  modalVisible,
  setModalVisible,
  typeModeIndex,
  setTypeModeIndex,
  typeModeText,
  confirm = () => null,
  cancel = () => null,
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
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Container>
          <ModalView>
            <ModalContextBox>
              {typeModeText.map((text, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setTypeModeIndex(index), setModalVisible(false);
                  }}
                >
                  <ModalContextText
                    key={index}
                    focused={typeModeIndex === index ? true : false}
                  >
                    {text}
                  </ModalContextText>
                </TouchableOpacity>
              ))}
            </ModalContextBox>
            <ModalButtonBox>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  setModalVisible(false);
                  cancel();
                }}
              >
                <ModalButtonText>취소</ModalButtonText>
              </TouchableOpacity>
            </ModalButtonBox>
          </ModalView>
        </Container>
      </Modal>
    </>
  );
};
