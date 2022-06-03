import React, { useContext, useState } from "react";
import { Modal, View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import WheelPicker from "react-native-wheely";

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
  height: ${constants.windowH * 0.3}px;
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

export default HourPickerModal = ({
  modalVisible,
  setModalVisible,
  hour,
  setHour,
  confirm = () => null,
  cancel = () => null,
}) => {
  const themeContext = useContext(ThemeContext);

  const [selectedIndex, setSelectedIndex] = useState(hour - 1);
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
              <ModalHeaderText>알림 주기</ModalHeaderText>
            </ModalHeader>
            <ModalContextBox>
              <WheelPicker
                selectedIndex={selectedIndex}
                options={options}
                onChange={(index) => setSelectedIndex(index)}
                selectedIndicatorStyle={{
                  backgroundColor: themeContext.mainColor,
                  borderBottomWidth: 0.6,
                  borderBottomColor: themeContext.utilColor,
                  borderTopColor: themeContext.utilColor,
                  borderTopWidth: 0.6,
                }}
                containerStyle={{
                  width: "50%",
                  // height: 110,
                }}
                visibleRest={1}
                // itemStyle={{ top: -60 }}
                itemHeight={45}
                itemTextStyle={{ fontSize: 15, color: themeContext.subColor }}
              />
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
                  setHour(options[selectedIndex]);
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
