import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import Container from "../../../components/Container";
import AuthButton from "../../../components/Auth/AuthButton";

const AuthBox = styled.View`
  margin: 10px 20px 0px 20px;
  padding: 30px 0px 10px 0px;
  align-items: center;
  width: 100%;
`;

export default AuthHomeView = ({ goToSignIn, goToSignUp }) => {
  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text>AuthHome</Text>
      </View>
      <AuthBox>
        <AuthButton text={"로그인"} onPress={goToSignIn} />
        <AuthButton text={"회원 가입"} onPress={goToSignUp} />
      </AuthBox>
    </Container>
  );
};
