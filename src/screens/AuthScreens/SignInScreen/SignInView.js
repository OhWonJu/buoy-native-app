import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { SvgXml } from "react-native-svg";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

import Container from "../../../components/Container";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthButton from "../../../components/Auth/AuthButton";
import { Google } from "../../../../styles/Icons";

const InputView = styled.View`
  margin-top: 5px;
  padding: 35px 0px 10px 0px;
  height: 235px;
  align-items: center;
`;
const UtilView = styled.View`
  height: 35px;
  flex-direction: row;
  align-items: center;
`;
const LeftBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
`;
const RightBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
const UtilText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  top: 1%;
  color: ${(props) => props.theme.mainColor};
`;
const EasySignInView = styled.View`
  border-style: solid;
  border-top-color: ${(props) => props.theme.mainColor};
  border-top-width: 1.2px;
  margin: 8px 0px 40px 0px;
  align-items: center;
`;
const EasySingBoxs = styled.View`
  flex-direction: row;
  padding-bottom: 10px;
`;
const EasySignInBox = styled.TouchableOpacity`
  margin: 0px 10px;
  border-radius: 25px;
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
`;
const EasySignText = styled.Text`
  padding: 15px 0px 25px 0px;
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.theme.mainColor};
`;

const NoticView = styled.View`
  margin: 10px 20px;
  padding-top: 40px;
`;
const NoticText = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.lightUtilColor};
`;

const OpacityBox = styled.View`
  width: 100%;
  align-items: center;
  margin-top: 4px;
`;

const Text = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #fbfbfb;
`;

const TextInput = styled.TextInput`
  height: 50px;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.mainColor};
  border-bottom-color: ${(props) => props.theme.lightUtilColor};
  border-bottom-width: 1.2px;
`;

const PasswordBox = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;
const VisibleControler = styled.TouchableOpacity`
  position: absolute;
  left: 88%;
  margin: 10px;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
`;

export default SignInView = ({
  goBack,
  goToSignUp,
  setValue,
  watch,
  emailCompleted,
  passwordCompleted,
  passwordUnvisible,
  onEmailNext,
  passwordRef,
  handlePasswordVisible,
  handleSubmit,
  onValid,
  turnOff,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container
      style={{ flex: 1, backgroundColor: themeContext.authThemeColor }}
    >
      <AuthHeader leftOnPress={goBack} />
      <InputView>
        <TextInput
          value={watch("email")}
          placeholder={"?????????"}
          placeholderTextColor={themeContext.lightUtilColor}
          keyboardType={"email-address"}
          returnKeyType="next"
          onChangeText={(text) => {
            emailCompleted(text);
            setValue("email", text);
          }}
          onSubmitEditing={onEmailNext}
        />
        <PasswordBox>
          <TextInput
            value={watch("password")}
            ref={passwordRef}
            placeholder={"????????????"}
            placeholderTextColor={themeContext.lightUtilColor}
            returnKeyType={"done"}
            onChangeText={(text) => {
              passwordCompleted(text);
              setValue("password", text);
            }}
            secureTextEntry={passwordUnvisible}
            onSubmitEditing={handleSubmit(onValid)}
          />
          <VisibleControler
            onPressIn={handlePasswordVisible}
            onPressOut={handlePasswordVisible}
          >
            {passwordUnvisible === true ? (
              <AntDesign name="eyeo" size={20} color={themeContext.mainColor} />
            ) : (
              <AntDesign name="eye" size={20} color={themeContext.mainColor} />
            )}
          </VisibleControler>
        </PasswordBox>
        <OpacityBox>
          <AuthButton
            text={"?????????"}
            disabled={turnOff}
            bgColor={turnOff ? null : themeContext.orangeColor}
            txColor={themeContext.lightUtilColor}
            containerStyle={{ borderRadius: 30 }}
            onPress={handleSubmit(onValid)}
          />
        </OpacityBox>
      </InputView>
      <UtilView>
        <LeftBox>
          <TouchableOpacity
            onPress={goToSignUp}
            style={{ flexDirection: "row" }}
          >
            <UtilText>????????????</UtilText>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={18}
              color={themeContext.mainColor}
            />
          </TouchableOpacity>
        </LeftBox>
        <RightBox>
          <TouchableOpacity>
            <UtilText>????????? ??????</UtilText>
          </TouchableOpacity>
          <Ionicons
            name="remove-outline"
            size={18}
            color={themeContext.mainColor}
            style={{ transform: [{ rotate: "90deg" }] }}
          />
          <TouchableOpacity>
            <UtilText>???????????? ??????</UtilText>
          </TouchableOpacity>
        </RightBox>
      </UtilView>
      <EasySignInView>
        <EasySignText>?????? ????????? / ?????? ??????</EasySignText>
        <EasySingBoxs>
          <EasySignInBox
            bgColor={"#F7D500"}
            // onPress={() => goSNSAuth("kakao")}
          >
            <Ionicons name="chatbubble-sharp" size={24} color="#573D1A" />
          </EasySignInBox>
          <EasySignInBox
            bgColor={"#4064AC"}
            // onPress={() => goSNSAuth("facebook")}
          >
            <FontAwesome name="facebook" size={26} color="#FBFBFB" />
          </EasySignInBox>
          <EasySignInBox
            bgColor={"#FBFBFB"}
            // onPress={() => goSNSAuth("google")}
          >
            <SvgXml xml={Google} width="70%" height="70%" />
          </EasySignInBox>
          <EasySignInBox
            bgColor={"#03C157"}
            // onPress={() => goSNSAuth("naver")}
          >
            <Text>N</Text>
          </EasySignInBox>
        </EasySingBoxs>
      </EasySignInView>
      <NoticView>
        <NoticText>
          ????????? ????????? ????????? ?????? ?????? '?????? ?????????'?????????. ?????? ?????????
          ???????????? ?????? ????????? ???????????? ????????? ?????? [?????????]?????? '????????????'???
          ????????????.
        </NoticText>
      </NoticView>
    </Container>
  );
};
