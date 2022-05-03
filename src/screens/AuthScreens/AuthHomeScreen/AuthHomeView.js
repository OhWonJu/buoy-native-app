import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import Container from "../../../components/Container";
import AuthButton from "../../../components/Auth/AuthButton";
import constants from "../../../../constants";

const LogoBox = styled.View`
  background-color: red;
  flex: 1;
  justify-content: flex-end;
`;

const AuthBox = styled.View`
  flex: 1;
  margin: 10px 20px 0px 20px;
  padding: 10px 0px 10px 0px;
  align-items: center;
  width: 100%;
`;

export default AuthHomeView = ({ goToSignIn, goToSignUp }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3F5369",
      }}
    >
      <LogoBox>
        <Text>LOGO</Text>
      </LogoBox>
      <AuthBox>
        <AuthButton
          text={"로그인"}
          onPress={goToSignIn}
          bgColor={themeContext.orangeColor}
          txColor={themeContext.mainColor}
          containerStyle={{ borderRadius: 30 }}
        />
        <AuthButton
          text={"회원 가입"}
          onPress={goToSignUp}
          bgColor={themeContext.mainColor}
          containerStyle={{ borderRadius: 30 }}
        />
      </AuthBox>
    </Container>
  );
};
