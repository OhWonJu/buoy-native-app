import React, { useContext, useRef } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import styled, { ThemeContext } from "styled-components/native";

import { userSignOut } from "../../../auth";
import constants from "../../../constants";
import { setAuth } from "../../../store/authReducer";
import Button from "../../components/Button";
import Container from "../../components/Container";
import TopHeader from "../../components/TopHeader";

const HeaderWrapper = styled.View`
  padding-top: ${constants.StatusBarHeight}px;
  justify-content: center;
  width: ${constants.screenW}px;
`;

const ContextWrapper = styled.View`
  width: 100%;
  padding-bottom: 12px;
  margin-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.lightUtilColor};
  flex-direction: row;
`;
const Left = styled.View`
  width: 80%;
`;
const Right = styled.View`
  width: 20%;
  background-color: green;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 16px;
  padding-bottom: 5px;
`;
const Context = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 11px;
`;

const PADDING = 32;
const size = constants.windowW - PADDING * 2;
const x = PADDING;
const y = 75;

export default SettingView = ({ goBack }) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  const pressed = useValue(0);
  const onTouch = useTouchHandler({
    onStart: () => {
      runTiming(pressed, pressed.current ? 0 : 1, { duration: 150 });
    },
  });

  return (
    <>
      <HeaderWrapper>
        <TopHeader title={"설정"} leftOnPress={() => goBack()} />
      </HeaderWrapper>
      <Container>
        <ContextWrapper>
          <Left>
            <Title>알람</Title>
            <Context>
              스마트 부표에서 보내오는 알람 수신 여부를 설정합니다.
            </Context>
          </Left>
          <Right></Right>
        </ContextWrapper>
        <ContextWrapper>
          <Left>
            <Title>알람 주기</Title>
            <Context>
              스마트 부표에서 보내오는 알람 수신 주기를 설정합니다.
            </Context>
          </Left>
          <Right></Right>
        </ContextWrapper>
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
    </>
  );
};
