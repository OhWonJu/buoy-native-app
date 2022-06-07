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
  /* background-color: ${(props) => props.theme.mainColor}; */
  background-color: white;
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
  beginHour,
  beginMin,
  endHour,
  endMin,
  isStart = true,
  confirm = () => null,
  cancel = () => null,
}) => {
  const [trigger, setTrigger] = useState(isStart);
  const [sTime, setSTime] = useState(
    new Date(1996, 1, 1, beginHour, beginMin, 0)
  );
  const [eTime, setETime] = useState(new Date(1996, 1, 1, endHour, endMin, 0));

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
                activeOpacity={1}
                active={trigger}
                onPress={() => setTrigger(true)}
              >
                <ModalHeaderText>시작</ModalHeaderText>
              </ModalHeaderTextBox>
              <ModalHeaderTextBox
                activeOpacity={1}
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
                  androidVariant={"iosClone"}
                  style={{ height: 120 }}
                />
              ) : (
                <DatePicker
                  title={null}
                  mode="time"
                  locale="ko"
                  is24hourSource={"locale"}
                  date={eTime}
                  onDateChange={setETime}
                  androidVariant={"iosClone"}
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
                  confirm(
                    undefined,
                    sTime.getHours(),
                    sTime.getMinutes(),
                    eTime.getHours(),
                    eTime.getMinutes()
                  );
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
