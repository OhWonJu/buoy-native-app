import React, { useContext } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import Container from "../../../components/Container";
import AuthButton from "../../../components/Auth/AuthButton";
import Button from "../../../components/Button";
import RowBox from "../../../components/RowBox";
import AuthHeader from "../../../components/Auth/AuthHeader";

const CreateAccountLayout = styled.View`
  flex: 1;
  justify-content: space-between;
`;
const NoticContext = styled.Text`
  font-size: 15px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 3px;
  color: ${(props) => props.theme.mainColor};
`;
const TextInput = styled.TextInput`
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  margin-bottom: 2px;
  color: ${(props) => props.theme.mainColor};
  border-bottom-color: ${(props) => props.theme.mainColor};
  border-bottom-width: 1.2px;
`;
const PasswordCheckInput = styled.TextInput`
  height: 50px;
  width: ${(props) => (props.width ? props.width : "100%")};
  padding: 10px;
  margin-bottom: 2px;
  color: ${(props) => props.theme.mainColor};
  border-bottom-width: 1.2px;
  border-bottom-color: ${(props) =>
    props.passwordChecked ? props.theme.mainColor : props.theme.redColor};
`;
const ColBox = styled.View`
  padding-bottom: 20px;
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
  nameRef,
  onNext,
  setCodeInput,
  requestEmailCode,
  confirmEmailCode,
  emailVerification,
  passwordVerification,
  passwordComparison,
  goBack,
  codeView,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container
      style={{
        backgroundColor: themeContext.authThemeColor,
      }}
    >
      <AuthHeader leftOnPress={goBack} />
      <CreateAccountLayout>
        <View>
          {!codeView ? (
            <ColBox>
              <NoticContext>이메일</NoticContext>
              <RowBox style={{ justifyContent: "space-between" }}>
                <TextInput
                  ref={emailRef}
                  defaultValue={getValues("email")}
                  placeholder={"이메일"}
                  placeholderTextColor={themeContext.lightUtilColor}
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
                  bgColor={themeContext.orangeColor}
                  radius={"30px"}
                  onPress={() => requestEmailCode(getValues("email"))}
                />
              </RowBox>
            </ColBox>
          ) : (
            <ColBox>
              <NoticContext>인증번호</NoticContext>
              <RowBox style={{ justifyContent: "space-between" }}>
                <TextInput
                  ref={emailRef}
                  placeholder={"인증번호"}
                  placeholderTextColor={themeContext.lightUtilColor}
                  returnKeyType={"done"}
                  onChangeText={(text) => setCodeInput(text)}
                  width={"66%"}
                />
                <Button
                  text={"인증번호 확인"}
                  width={"31%"}
                  bgColor={themeContext.orangeColor}
                  radius={"30px"}
                  onPress={confirmEmailCode}
                />
              </RowBox>
            </ColBox>
          )}
          <ColBox>
            <NoticContext>비밀번호</NoticContext>
            <TextInput
              ref={passwordRef}
              defaultValue={getValues("password")}
              placeholder={"비밀번호"}
              placeholderTextColor={themeContext.lightUtilColor}
              returnKeyType={"next"}
              secureTextEntry={true}
              onSubmitEditing={() => onNext(passwordCheckRef)}
              onChangeText={(text) => {
                passwordVerification(text), setValue("password", text);
              }}
              onEndEditing={passwordComparison}
            />
          </ColBox>
          <ColBox>
            <NoticContext>비밀번호 확인</NoticContext>
            <PasswordCheckInput
              ref={passwordCheckRef}
              defaultValue={getValues("passwordCheck")}
              placeholder={"비밀번호 확인"}
              placeholderTextColor={themeContext.lightUtilColor}
              secureTextEntry={true}
              returnKeyType={"done"}
              passwordChecked={condition.passwordConfirm}
              onChangeText={(text) => setValue("passwordCheck", text)}
              onEndEditing={passwordComparison}
              onSubmitEditing={() => onNext(nameRef)}
            />
          </ColBox>
          <ColBox>
            <NoticContext>이름</NoticContext>
            <TextInput
              placeholder={"이름"}
              ref={nameRef}
              defaultValue={getValues("name")}
              placeholderTextColor={themeContext.lightUtilColor}
              returnKeyType={"next"}
              autoCapitalize={"none"}
              onSubmitEditing={() =>
                console.log(condition, getValues("name").length)
              }
              onChangeText={(text) => {
                setValue("name", text);
              }}
            />
          </ColBox>
        </View>

        <AuthButton
          text={"시작하기"}
          txSize={20}
          bgColor={
            !condition.emailConfirm ||
            !condition.passwordConfirm ||
            !condition.passwordVerify ||
            getValues("name").length < 1
              ? null
              : themeContext.orangeColor
          }
          txColor={themeContext.lightUtilColor}
          disable={
            !condition.emailConfirm ||
            !condition.passwordConfirm ||
            !condition.passwordVerify ||
            getValues("name").length < 1
          }
          containerStyle={{ borderRadius: 30, height: 45 }}
          onPress={handleSubmit(onRegist)}
        />
      </CreateAccountLayout>
    </Container>
  );
};
