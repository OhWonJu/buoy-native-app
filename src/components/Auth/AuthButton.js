import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const Container = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.lightUtilColor};
  padding: 10px;
  margin: 5px;
  height: 55px;
  border-radius: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const Text = styled.Text`
  /* color: #ffffff; */
  color: ${(props) => (props.txColor ? props.txColor : props.theme.subColor)};
  text-align: center;
  font-weight: 700;
  font-size: ${(props) => (props.txSize ? props.txSize : "19")}px;
`;

export default AuthButton = ({
  text,
  onPress,
  loading = false,
  disabled = false,
  bgColor = null,
  txColor = null,
  txSize = null,
}) => (
  <Container disabled={disabled} onPress={onPress} bgColor={bgColor}>
    {loading ? (
      <ActivityIndicator color={"#FFFFFF"} />
    ) : (
      <Text txColor={txColor} txSize={txSize}>
        {text}
      </Text>
    )}
  </Container>
);
