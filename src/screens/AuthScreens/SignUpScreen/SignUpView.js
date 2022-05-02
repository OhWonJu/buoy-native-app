import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import Container from "../../../components/Container";
import AuthButton from "../../../components/Auth/AuthButton";
import Button from "../../../components/Button";

const TextInput = styled.TextInput`
  background-color: ${(props) => props.theme.lightUtilColor};
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
`;
const PasswordCheckInput = styled.TextInput`
  background-color: ${(props) => props.theme.lightUtilColor};
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;
  border: ${(props) => (props.passwordChecked ? 0 : 1)}px;
  border-color: ${(props) => props.theme.redColor};
`;

export default SignUpView = ({
  condition,
  handleSubmit,
  setValue,
  getValues,
  onRegist,
  emailRef,
  passwordRef,
  passwordCheckRef,
  firstNameRef,
  onNext,
  setCodeInput,
  requestEmailCode,
  confirmEmailCode,
  emailVerification,
  passwordVerification,
  passwordComparison,
  goBack,
}) => {
  return (
    <Container style={{ justifyContent: "center", alignItems: "center" }}>
      <TextInput
        placeholder={"성"}
        defaultValue={getValues("lastName")}
        returnKeyType={"next"}
        autoCapitalize={"none"}
        onSubmitEditing={() => onNext(firstNameRef)}
        onChangeText={(text) => {
          setValue("lastName", text);
        }}
        width={"35%"}
      />
      <TextInput
        placeholder={"이름"}
        ref={firstNameRef}
        defaultValue={getValues("firstName")}
        returnKeyType={"next"}
        autoCapitalize={"none"}
        onSubmitEditing={() => onNext(phoneNumberRef)}
        onChangeText={(text) => setValue("firstName", text)}
        width={"60%"}
      />
      <TextInput
        ref={passwordRef}
        defaultValue={getValues("password")}
        placeholder={"비밀번호"}
        returnKeyType={"next"}
        secureTextEntry={true}
        onSubmitEditing={() => onNext(passwordCheckRef)}
        onChangeText={(text) => {
          passwordVerification(text), setValue("password", text);
        }}
        onEndEditing={passwordComparison}
        style={{ marginBottom: 7 }}
      />
      <PasswordCheckInput
        ref={passwordCheckRef}
        defaultValue={getValues("passwordCheck")}
        placeholder={"비밀번호 확인"}
        secureTextEntry={true}
        returnKeyType={"done"}
        passwordChecked={condition.passwordConfirm}
        onChangeText={(text) => setValue("passwordCheck", text)}
        onEndEditing={passwordComparison}
        onSubmitEditing={() => console.log(condition)}
      />
      <TextInput
        ref={emailRef}
        defaultValue={getValues("email")}
        placeholder={"이메일"}
        keyboardType={"email-address"}
        returnKeyType={"next"}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text) => {
          emailVerification(text), setValue("email", text);
        }}
        editable={condition.emailConfirm ? false : true}
        width={"66%"}
      />
      <Button
        text={"인증코드 받기"}
        width={"31%"}
        disable={!condition.emailVerify || condition.emailConfirm}
        onPress={() => requestEmailCode(getValues("email"))}
      />

      <TextInput
        ref={emailRef}
        placeholder={"인증코드"}
        returnKeyType={"done"}
        onChangeText={(text) => setCodeInput(text)}
        width={"66%"}
      />
      <Button text={"인증코드 확인"} width={"31%"} onPress={confirmEmailCode} />
      <Button
        text={"시작하기"}
        width={"100%"}
        radius={"0px"}
        txSize={25}
        disable={
          !condition.emailConfirm ||
          !condition.passwordConfirm ||
          !condition.passwordVerify
        }
        onPress={handleSubmit(onRegist)}
      />
    </Container>
  );
};
