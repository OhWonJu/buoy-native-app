import React, { useState } from "react";
import { Modal, View } from "react-native";
import styled from "styled-components/native";

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
  width: 90%;
`;
const ModalContextBox = styled.View`
  flex: 1;
  width: 100%;
  padding: 20px;
`;
const ModalContextText = styled.Text`
  padding: 5px 0px 5px 0px;
  color: ${(props) => props.theme.subColor};
  font-size: 20px;
  font-weight: bold;
`;
const ModalSubText = styled.Text`
  padding: 3px 0px 5px 0px;
  color: ${(props) => props.theme.darkUtilColor};
  font-size: 12px;
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
  color: ${(props) =>
    props.disable ? props.theme.darkUtilColor : props.theme.subColor};
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.lightUtilColor};
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
  border: ${(props) => (props.length < 1 ? 1 : 0)}px;
  border-color: ${(props) => props.theme.redColor + 80};
`;

export default NameEditModal = ({
  modalVisible,
  setModalVisible,
  oldName,
  confirm = () => null,
  cancel = () => null,
}) => {
  const [newName, setNewName] = useState("");

  return (
    <>
      <ModalFade modalVisible={modalVisible} />
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Container>
          <ModalView>
            <ModalContextBox>
              <ModalContextText>그룹 이름 변경</ModalContextText>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <TextInput
                  defaultValue={oldName}
                  returnKeyType={"done"}
                  onChangeText={(text) => setNewName(text)}
                  length={newName.length}
                />
                <ModalSubText>최소 1글자 이상 입력해주세요.</ModalSubText>
              </View>
            </ModalContextBox>
            <ModalButtonBox>
              <ModalButton
                onPress={() => {
                  setModalVisible(false);
                  confirm(newName);
                }}
                style={{ borderRightColor: "#EFEFEF", borderRightWidth: 1 }}
                disabled={newName.length < 1 ? true : false}
              >
                <ModalButtonText
                  disable={
                    newName.length < 1 || newName === oldName ? true : false
                  }
                >
                  확인
                </ModalButtonText>
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
