import React, { useContext, useRef } from "react";
import { View, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import styled, { ThemeContext } from "styled-components/native";

import { userSignOut } from "../../../auth";
import constants from "../../../constants";
import { setAuth } from "../../../store/authReducer";
import Button from "../../components/Button";
import Container from "../../components/Container";
import RowBox from "../../components/RowBox";
import Switch from "../../components/Switch";
import TopHeader from "../../components/TopHeader";

const HeaderWrapper = styled.View`
  /* padding-top: ${constants.StatusBarHeight}px; */
  justify-content: center;
  width: ${constants.screenW}px;
`;

const ContextWrapper = styled.TouchableOpacity`
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
  color: ${(props) => props.theme.subColor};
  font-size: 16px;
  padding-bottom: 5px;
`;
const Context = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 11px;
  padding-bottom: 1px;
`;

export default SettingView = ({ goBack }) => {
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
              <Title>개인정보 수정</Title>
            </Left>
            <Right></Right>
          </ContextWrapper>
          <ContextWrapper>
            <Left>
              <Title>비밀번호 변경</Title>
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
              <Title>알림</Title>
              <Context>
                스마트 부표에서 보내오는 알림 수신 여부를 설정합니다.
              </Context>
            </Left>
            <Right>
              <Switch
                size={20}
                toggleAction={(toggle) => {
                  if (toggle === 0) {
                    alert("BYE");
                  }
                  if (toggle === 1) {
                    alert("HI");
                  }
                }}
              />
            </Right>
          </ContextWrapper>
          <ContextWrapper>
            <Left>
              <Title>알림 주기</Title>
              <Context>
                스마트 부표에서 보내오는 알림 수신 주기를 설정합니다.
              </Context>
            </Left>
            <Right>
              <Context>3 시간</Context>
            </Right>
          </ContextWrapper>
          <ContextWrapper style={{ borderBottomWidth: 0, marginBottom: 0 }}>
            <Left>
              <Title>방해금지 시간대 설정</Title>
              <Context>알림을 수신하지 않을 시간대를 설정합니다.</Context>
              <Context>PM 11:00 - AM 08:00</Context>
            </Left>
            <Right style={{ alignItems: "flex-end" }}>
              <Switch size={20} />
            </Right>
          </ContextWrapper>
          <RowBox>
            <ContextWrapper style={{ flex: 1 }}>
              <View>
                <Title>시작</Title>
                <Title>PM 11:00</Title>
              </View>
            </ContextWrapper>
            <ContextWrapper style={{ flex: 1 }}>
              <View>
                <Title>종료</Title>
                <Title>AM 08:00</Title>
              </View>
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
    </>
  );
};
