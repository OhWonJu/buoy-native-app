import { useNavigation } from "@react-navigation/native";
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

export default SettingView = ({}) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <>
      <HeaderWrapper>
        <TopHeader title={"환경 설정"} leftOnPress={() => goBack()} />
      </HeaderWrapper>
      <Container>
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
