import React, { useContext, useRef } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import styled, { ThemeContext } from "styled-components/native";

import { userSignOut } from "../../../auth";
import constants from "../../../constants";
import { setAuth } from "../../../store/authReducer";
import Button from "../../components/Button";
import Container from "../../components/Container";
import TimePickerModal from "../../components/Modals/TimePickerModal";
import RowBox from "../../components/RowBox";
import Switch from "../../components/Switch";
import TopHeader from "../../components/TopHeader";

const HeaderWrapper = styled.View`
  /* padding-top: ${constants.StatusBarHeight}px; */
  justify-content: center;
  width: ${constants.screenW}px;
`;

const ContextWrapper = styled.View`
  width: 100%;
  padding-bottom: 12px;
  margin-bottom: 15px;
  border-bottom-width: 0.8px;
  border-bottom-color: ${(props) => props.theme.lightUtilColor};
  flex-direction: row;
`;
const Left = styled.View`
  width: 75%;
`;
const Right = styled.View`
  width: 25%;
  justify-content: center;
  align-items: flex-end;
`;
const Title = styled.Text`
  color: ${(props) =>
    props.disable ? props.theme.utilColor : props.theme.subColor};
  font-size: 16px;
  padding-bottom: 5px;
`;
const Context = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 11px;
  padding-bottom: 1px;
`;

export default SettingView = ({
  goBack,
  alertActivate,
  setAlertActivate,
  cycleModalVisible,
  setCycleModalVisible,
  interferenceTimeActivate,
  setInterferenceTimeActivate,
  interferenceStartTime,
  setInterferenceStartTime,
  interferenceStopTime,
  setInterferenceStopTime,
  interfModalVisible,
  isStart,
  setIsStart,
  setInterfModalVisible,
  toggle,
}) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <>
      <HeaderWrapper>
        <TopHeader title={"설정"} leftOnPress={() => goBack()} />
      </HeaderWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container style={{ minHeight: constants.screenH }}>
          <ContextWrapper
            style={{
              borderBottomWidth: 0,
              marginBottom: 0,
            }}
          >
            <Context style={{ fontWeight: "bold" }}>개인/보안</Context>
          </ContextWrapper>
          <ContextWrapper>
            <Left>
              <TouchableOpacity activeOpacity={1}>
                <Title>개인정보 수정</Title>
              </TouchableOpacity>
            </Left>
            <Right></Right>
          </ContextWrapper>
          <ContextWrapper>
            <Left>
              <TouchableOpacity activeOpacity={1}>
                <Title>비밀번호 변경</Title>
              </TouchableOpacity>
            </Left>
            <Right></Right>
          </ContextWrapper>
          {/*  */}
          <ContextWrapper
            style={{ borderBottomWidth: 0, marginBottom: 0, paddingTop: 15 }}
          >
            <Context style={{ fontWeight: "bold" }}>알림</Context>
          </ContextWrapper>
          <ContextWrapper>
            <Left>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => toggle(alertActivate, setAlertActivate)}
              >
                <Title>알림</Title>
                <Context>
                  스마트 부표에서 보내오는 알림 수신 여부를 설정합니다.
                </Context>
              </TouchableOpacity>
            </Left>
            <Right>
              <Switch
                size={20}
                toggleAction={(toggle) => {
                  if (toggle === 0) {
                    setAlertActivate(false);
                  }
                  if (toggle === 1) {
                    setAlertActivate(true);
                  }
                }}
                toggleValue={alertActivate}
              />
            </Right>
          </ContextWrapper>
          <ContextWrapper>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              activeOpacity={1}
            >
              <Left>
                <Title disable={!alertActivate}>알림 주기</Title>
                <Context>
                  스마트 부표에서 보내오는 알림 수신 주기를 설정합니다.
                </Context>
              </Left>
              <Right>
                <Context
                  style={{
                    color: alertActivate
                      ? themeContext.blueColor
                      : themeContext.utilColor,
                  }}
                >
                  3 시간
                </Context>
              </Right>
            </TouchableOpacity>
          </ContextWrapper>
          <ContextWrapper style={{ borderBottomWidth: 0, marginBottom: 0 }}>
            <Left>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  toggle(interferenceTimeActivate, setInterferenceTimeActivate)
                }
              >
                <Title>방해금지 시간대 설정</Title>
                <Context>알림을 수신하지 않을 시간대를 설정합니다.</Context>
                <Context>
                  {interferenceStartTime.getHours() < 12 ? "AM" : "PM"}{" "}
                  {interferenceStartTime.getHours() > 12
                    ? String(interferenceStartTime.getHours() - 12).padStart(
                        2,
                        "0"
                      )
                    : String(interferenceStartTime.getHours()).padStart(2, "0")}
                  :{" "}
                  {String(interferenceStartTime.getMinutes()).padStart(2, "0")}{" "}
                  ~ {interferenceStopTime.getHours() < 12 ? "AM" : "PM"}{" "}
                  {interferenceStopTime.getHours() > 12
                    ? String(interferenceStopTime.getHours() - 12).padStart(
                        2,
                        "0"
                      )
                    : String(interferenceStopTime.getHours()).padStart(2, "0")}
                  : {String(interferenceStopTime.getMinutes()).padStart(2, "0")}
                </Context>
              </TouchableOpacity>
            </Left>
            <Right style={{ alignItems: "flex-end" }}>
              <Switch
                size={20}
                toggleAction={(toggle) => {
                  if (toggle === 0) {
                    setInterferenceTimeActivate(false);
                  }
                  if (toggle === 1) {
                    setInterferenceTimeActivate(true);
                  }
                }}
              />
            </Right>
          </ContextWrapper>
          <RowBox>
            <ContextWrapper style={{ flex: 1 }}>
              <TouchableOpacity
                disabled={!interferenceTimeActivate}
                onPress={() => {
                  setIsStart(true);
                  setInterfModalVisible(true);
                }}
              >
                <Title disable={!interferenceTimeActivate}>시작</Title>
                <Title disable={!interferenceTimeActivate}>
                  {interferenceStartTime.getHours() < 12 ? "AM" : "PM"}{" "}
                  {interferenceStartTime.getHours() > 12
                    ? String(interferenceStartTime.getHours() - 12).padStart(
                        2,
                        "0"
                      )
                    : String(interferenceStartTime.getHours()).padStart(2, "0")}
                  :{" "}
                  {String(interferenceStartTime.getMinutes()).padStart(2, "0")}{" "}
                </Title>
              </TouchableOpacity>
            </ContextWrapper>
            <ContextWrapper style={{ flex: 1 }}>
              <TouchableOpacity
                disabled={!interferenceTimeActivate}
                onPress={() => {
                  setIsStart(false);
                  setInterfModalVisible(true);
                }}
              >
                <Title disable={!interferenceTimeActivate}>종료</Title>
                <Title disable={!interferenceTimeActivate}>
                  {interferenceStopTime.getHours() < 12 ? "AM" : "PM"}{" "}
                  {interferenceStopTime.getHours() > 12
                    ? String(interferenceStopTime.getHours() - 12).padStart(
                        2,
                        "0"
                      )
                    : String(interferenceStopTime.getHours()).padStart(2, "0")}
                  : {String(interferenceStopTime.getMinutes()).padStart(2, "0")}
                </Title>
              </TouchableOpacity>
            </ContextWrapper>
          </RowBox>
          {/*  */}
          <Button
            text={"로그아웃"}
            width={"100%"}
            txSize={16}
            onPress={() => {
              dispatch(setAuth({ isSignIn: false, tokenVal: null }));
              userSignOut();
            }}
          />
        </Container>
      </ScrollView>
      {interfModalVisible && (
        <TimePickerModal
          modalVisible={interfModalVisible}
          setModalVisible={setInterfModalVisible}
          startTime={interferenceStartTime}
          setStartTime={setInterferenceStartTime}
          stopTime={interferenceStopTime}
          setStopTime={setInterferenceStopTime}
          isStart={isStart}
        />
      )}
    </>
  );
};
