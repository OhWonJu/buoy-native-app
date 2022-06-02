import React, { useState } from "react";
import { Modal, View } from "react-native";
import styled from "styled-components/native";
import DatePicker from "react-native-date-picker";

import constants from "../../../constants";
import ModalFade from "./ModalFade";

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
  height: ${constants.windowH * 0.33}px;
  width: 75%;
`;
const ModalHeader = styled.View`
  height: 50px;
  width: 80%;
  padding: 10px 0px 10px 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ModalHeaderTextBox = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-width: ${(props) => (props.active ? 1.8 : 0)}px;
  border-bottom-color: ${(props) => props.theme.blueColor};
`;
const ModalHeaderText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.theme.subColor};
`;
const ModalContextBox = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ModalButtonBox = styled.View`
  width: 100%;
  height: 50px;
  padding: 0px 10px 0px 0px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const ModalButton = styled.TouchableOpacity`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 20px 0px 20px;
`;

const ModalButtonText = styled.Text`
  color: ${(props) => props.theme.blueColor};
  font-weight: bold;
  font-size: 13px;
`;

export default TimePickerModal = ({
  modalVisible,
  setModalVisible,
  startTime,
  setStartTime,
  stopTime,
  setStopTime,
  isStart = true,
  confirm = () => null,
  cancel = () => null,
}) => {
  const [trigger, setTrigger] = useState(isStart);
  const [sTime, setSTime] = useState(startTime);
  const [eTime, setETime] = useState(stopTime);

  return (
    <>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalFade modalVisible={modalVisible} />
        <Container>
          <ModalView>
            <ModalHeader>
              <ModalHeaderTextBox
                active={trigger}
                onPress={() => setTrigger(true)}
              >
                <ModalHeaderText>시작</ModalHeaderText>
              </ModalHeaderTextBox>
              <ModalHeaderTextBox
                active={!trigger}
                onPress={() => setTrigger(false)}
              >
                <ModalHeaderText>종료</ModalHeaderText>
              </ModalHeaderTextBox>
            </ModalHeader>
            <ModalContextBox>
              {trigger ? (
                <DatePicker
                  title={null}
                  mode="time"
                  locale="ko"
                  is24hourSource={"locale"}
                  date={sTime}
                  onDateChange={setSTime}
                  androidVariant={"nativeAndroid"}
                />
              ) : (
                <DatePicker
                  title={null}
                  mode="time"
                  locale="ko"
                  is24hourSource={"locale"}
                  date={eTime}
                  onDateChange={setETime}
                  androidVariant={"nativeAndroid"}
                />
              )}
            </ModalContextBox>
            <ModalButtonBox>
              <ModalButton
                onPress={() => {
                  setModalVisible(false);
                  cancel();
                }}
              >
                <ModalButtonText>취소</ModalButtonText>
              </ModalButton>
              <ModalButton
                onPress={() => {
                  setModalVisible(false);
                  setStartTime(sTime);
                  setStopTime(eTime);
                  confirm();
                }}
              >
                <ModalButtonText>확인</ModalButtonText>
              </ModalButton>
            </ModalButtonBox>
          </ModalView>
        </Container>
      </Modal>
    </>
  );
};
