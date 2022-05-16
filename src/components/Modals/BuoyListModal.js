import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { setBuoyListModal } from "../../../store/buoyListModalReducer";
import ModalFade from "./ModalFade";

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  /* background-color: rgba(0, 0, 0, 0.25); */
  height: 100%;
`;
const ModalView = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  align-items: center;
  height: 40%;
  width: 100%;
`;
const ModalHeader = styled.View`
  padding: 0px 20px 0px 20px;
  justify-content: center;
  height: 25%;
  width: 100%;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 18px;
  font-weight: bold;
`;
const SubText = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 13px;
`;

const ModalContextBox = styled.View`
  height: 60%;
  width: 100%;
  padding: 5px 20px 10px 20px;
  justify-content: space-around;
`;
const ContextButton = styled.TouchableOpacity``;
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

export default BuoyListModal = ({ modalVisible, modalData }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cencel = () => {
    dispatch(
      setBuoyListModal({
        modalVisible: false,
        modalData: null,
      })
    );
  };

  const goToGroupList = () =>
    navigation.navigate("GroupList", {
      buoyList: [modalData.model],
      isAppend: true,
    });

  return (
    <>
      <ModalFade modalVisible={modalVisible} close={cencel} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => cencel()}
      >
        <Container>
          <ModalView>
            <ModalHeader>
              <Title>{modalData.model}</Title>
              <SubText>{modalData.model_idx}</SubText>
            </ModalHeader>
            <ModalContextBox>
              <ContextButton
                onPress={() => {
                  goToGroupList();
                  cencel();
                }}
              >
                <ModalContextText>구역 할당</ModalContextText>
              </ContextButton>
              <ContextButton>
                <ModalContextText>부표 편집</ModalContextText>
              </ContextButton>
              <ContextButton>
                <ModalContextText>삭제</ModalContextText>
              </ContextButton>
            </ModalContextBox>
            <ModalButtonBox>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  cencel();
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
