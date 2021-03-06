import React, { useState, useEffect, useCallback } from "react";
import { Modal, View, FlatList, Text } from "react-native";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import Checkbox from "expo-checkbox";

import constants from "../../../constants";
import ModalFade from "./ModalFade";
import { _GROUP_CREATE } from "../../../utils/Api";
import RowBox from "../RowBox";

const ModalView = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  height: 520px;
  width: 90%;
`;
const ModalHeader = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  padding: 10px 20px 10px 20px;
  /* align-items: center; */
`;
const ModalHeaderText = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.subColor};
`;
const ModalContextBox = styled.View`
  flex: 1;
  width: 100%;
  padding: 5px 20px 20px 20px;
  /* justify-content: space-around; */
  /* background-color: blue; */
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

const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.lightUtilColor};
  height: 40px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
  border: ${(props) => (props.groupNameChecked ? 0 : 1)}px;
  border-color: ${(props) => props.theme.redColor + 80};
`;

const ColBox = styled.View`
  padding-bottom: 10px;
`;

export default GroupCreateModal = ({
  modalVisible,
  setModalVisible,
  onRefresh,
  confirm = () => null,
  cancel = () => null,
}) => {
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      groupName: "",
      groupSystem: 0,
      plainBuoy: 0,
    },
  });
  useEffect(() => {
    register("groupName", {
      required: true,
    });
    register("groupSystem", {
      required: true,
    });
    register("plainBuoy", {
      required: true,
    });
  }, [register]);

  const onRegist = async (data) => {
    let isDone = false;
    isDone = await _GROUP_CREATE({
      group_name: data.groupName,
      group_system: data.groupSystem,
      plain_buoy: parseInt(data.plainBuoy),
    });
    if (isDone) {
      onRefresh();
      setModalVisible(false);
    } else {
      alert("?????? ????????? ??????????????????.");
    }
  };

  const [groupNameVerify, setGroupNameVerift] = useState(false);
  const groupNameVerification = (text) => {
    if (text.length < 1) {
      setGroupNameVerift(false);
    } else {
      setGroupNameVerift(true);
    }
  };

  const checkData = [
    "?????? ?????????",
    "?????? ?????????",
    "?????? ?????????",
    "?????? ?????????",
  ];
  const [checked, setChecked] = useState(getValues("groupSystem"));

  const RENDERITEM = ({ item, index }) => {
    return (
      <RowBox
        style={{
          paddingVertical: 10,
        }}
      >
        <Text style={{ paddingRight: 15 }}>{item}</Text>
        <Checkbox
          disabled={false}
          value={checked === index}
          onValueChange={() => {
            setChecked(index);
            setValue("groupSystem", index);
          }}
        />
      </RowBox>
    );
  };
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <>
      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalFade modalVisible={modalVisible} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            zIndex: 3,
          }}
        >
          <ModalView>
            <ModalHeader>
              <ModalHeaderText>??? ?????? ?????????</ModalHeaderText>
            </ModalHeader>
            <ModalContextBox>
              <ColBox>
                <ModalContextText>?????? ??????</ModalContextText>
                <TextInput
                  //   defaultValue={}
                  returnKeyType={"done"}
                  onChangeText={(text) => {
                    groupNameVerification(text), setValue("groupName", text);
                  }}
                  groupNameChecked={groupNameVerify}
                />
                <ModalSubText>?????? 1?????? ?????? ??????????????????.</ModalSubText>
              </ColBox>
              <ColBox>
                <ModalContextText>?????? ??????</ModalContextText>
                <TextInput
                  keyboardType={"number-pad"}
                  returnKeyType={"done"}
                  onChangeText={(text) => {
                    setValue("plainBuoy", text);
                  }}
                  groupNameChecked={true}
                />
                <ModalSubText>0 ?????? ???????????? ??????????????????.</ModalSubText>
              </ColBox>
              <ColBox style={{ flex: 1 }}>
                <ModalContextText>?????? ??????</ModalContextText>
                <FlatList
                  data={checkData}
                  keyExtractor={keyExtractor}
                  renderItem={RENDERITEM}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ zIndex: 999 }}
                />
              </ColBox>
            </ModalContextBox>
            <ModalButtonBox>
              <ModalButton
                onPress={() => {
                  setModalVisible(false);
                  cancel();
                }}
                style={{ borderRightColor: "#EFEFEF", borderRightWidth: 1 }}
              >
                <ModalButtonText>??????</ModalButtonText>
              </ModalButton>
              <ModalButton
                disabled={groupNameVerify ? false : true}
                onPress={handleSubmit(onRegist)}
              >
                <ModalButtonText disable={groupNameVerify ? false : true}>
                  ??????
                </ModalButtonText>
              </ModalButton>
            </ModalButtonBox>
          </ModalView>
        </View>
      </Modal>
    </>
  );
};
