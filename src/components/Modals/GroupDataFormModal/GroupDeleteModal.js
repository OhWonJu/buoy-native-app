import React, { useState } from "react";
import { Modal, View } from "react-native";
import styled from "styled-components/native";

import constants from "../../../../constants";
import ModalFade from "../ModalFade";

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
  height: ${constants.windowH * 0.23}px;
  width: 70%;
`;
const ModalHeader = styled.View`
  height: 30%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const ModalHeaderText = styled.Text`
  font-weight: bold;
  font-size: 19px;
  color: ${(props) => props.theme.subColor};
`;
const ModalContextBox = styled.View`
  flex: 1;
  width: 100%;
  padding: 5px 20px 20px 20px;
  justify-content: space-around;
  align-items: center;
`;
const ModalContextText = styled.Text`
  padding: 5px 0px 5px 0px;
  color: ${(props) => props.theme.subColor};
  font-size: 15px;
  font-weight: bold;
`;
const ModalSubText = styled.Text`
  padding: 3px 0px 5px 0px;
  color: ${(props) => props.theme.darkUtilColor};
  font-size: 11px;
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

export default GroupDeleteModal = ({
  modalVisible,
  setModalVisible,
  deleteGroup,
  setDeleteGroup,
  confirm = () => null,
  cancel = () => null,
}) => {
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
              <ModalHeaderText>알림</ModalHeaderText>
            </ModalHeader>
            <ModalContextBox>
              <ModalContextText>{deleteGroup.groupName}</ModalContextText>
              <ModalSubText>선택 하신 구역을 삭제하시겠습니까?</ModalSubText>
            </ModalContextBox>
            <ModalButtonBox>
              <ModalButton
                onPress={() => {
                  setDeleteGroup({ groupName: "", groupId: null });
                  setModalVisible(false);
                  cancel();
                }}
                style={{ borderRightColor: "#EFEFEF", borderRightWidth: 1 }}
              >
                <ModalButtonText>취소</ModalButtonText>
              </ModalButton>
              <ModalButton
                onPress={() => {
                  setModalVisible(false);
                  confirm(deleteGroup.groupId);
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
