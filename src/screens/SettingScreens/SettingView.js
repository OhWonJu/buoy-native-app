import React, { useContext, useRef } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import styled, { ThemeContext } from "styled-components/native";

import { userSignOut } from "../../../auth";
import constants from "../../../constants";
import { setAuth } from "../../../store/authReducer";
import Button from "../../components/Button";
import Container from "../../components/Container";
import HourPickerModal from "../../components/Modals/HourPickerModal";
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
  interval,
  setAlertInterval,
  intervalModalVisible,
  setIntervalModalVisible,
  interferenceTimeActivate,
  beginHour,
  beginMin,
  endHour,
  endMin,
  interfModalVisible,
  setInterference,
  isStart,
  setIsStart,
  setInterfModalVisible,
  logOut,
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
                onPress={() => setAlertInterval(alertActivate ? 0 : 1)}
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
                value={alertActivate}
                onValueChange={(toggle) => setAlertInterval(toggle)}
              />
            </Right>
          </ContextWrapper>
          <ContextWrapper>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              activeOpacity={1}
              disabled={!alertActivate}
              onPress={() => setIntervalModalVisible(true)}
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
                    fontSize: 13,
                    color: alertActivate
                      ? themeContext.blueColor
                      : themeContext.utilColor,
                  }}
                >
                  {interval} 시간
                </Context>
              </Right>
            </TouchableOpacity>
          </ContextWrapper>
          <ContextWrapper style={{ borderBottomWidth: 0, marginBottom: 0 }}>
            <Left>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  setInterference(interferenceTimeActivate ? 0 : 1)
                }
              >
                <Title>방해금지 시간대 설정</Title>
                <Context>알림을 수신하지 않을 시간대를 설정합니다.</Context>
                <Context>
                  {beginHour < 12 ? "AM" : "PM"}{" "}
                  {beginHour > 12
                    ? String(beginHour - 12).padStart(2, "0")
                    : String(beginHour).padStart(2, "0")}
                  :{String(beginMin).padStart(2, "0")} ~{" "}
                  {endHour < 12 ? "AM" : "PM"}{" "}
                  {endHour > 12
                    ? String(endHour - 12).padStart(2, "0")
                    : String(endHour).padStart(2, "0")}
                  :{String(endMin).padStart(2, "0")}
                </Context>
              </TouchableOpacity>
            </Left>
            <Right style={{ alignItems: "flex-end" }}>
              <Switch
                size={20}
                value={interferenceTimeActivate}
                onValueChange={(toggle) => {
                  setInterference(toggle);
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
                  {beginHour < 12 ? "AM" : "PM"}{" "}
                  {beginHour > 12
                    ? String(beginHour - 12).padStart(2, "0")
                    : String(beginHour).padStart(2, "0")}
                  :{String(beginMin).padStart(2, "0")} ~{" "}
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
                  {endHour < 12 ? "AM" : "PM"}{" "}
                  {endHour > 12
                    ? String(endHour - 12).padStart(2, "0")
                    : String(endHour).padStart(2, "0")}
                  :{String(endMin).padStart(2, "0")}
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
              logOut();
            }}
          />
        </Container>
      </ScrollView>
      {intervalModalVisible && (
        <HourPickerModal
          modalVisible={intervalModalVisible}
          setModalVisible={setIntervalModalVisible}
          hour={interval}
          setAlertInterval={setAlertInterval}
        />
      )}
      {interfModalVisible && (
        <TimePickerModal
          modalVisible={interfModalVisible}
          setModalVisible={setInterfModalVisible}
          beginHour={beginHour}
          beginMin={beginMin}
          endHour={endHour}
          endMin={endMin}
          isStart={isStart}
          confirm={setInterference}
        />
      )}
    </>
  );
};
