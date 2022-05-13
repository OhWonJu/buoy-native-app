import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.idnColor};
  padding: 10px;
  border-radius: ${(props) => (props.radius ? props.radius : "10px")};
  ${(props) => props.height && { height: props.height }}
  width: ${(props) => (props.width ? props.width : "50%")};
  /* align-items: center; */
  justify-content: center;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
const Icon = styled.View`
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  /* color: #ffffff; */
  color: ${(props) => (props.txColor ? props.txColor : props.theme.bgColor)};
  text-align: center;
  font-size: ${(props) => (props.txSize ? props.txSize : "12")}px;
`;

const Button = ({
  text,
  onPress,
  disable = false,
  width,
  height = null,
  bgColor = null,
  txColor = null,
  txSize = null,
  icon = null,
  radius = null,
}) => (
  <Container
    disabled={disable}
    onPress={onPress}
    bgColor={bgColor}
    width={width}
    height={height}
    radius={radius}
  >
    <Icon>{icon}</Icon>
    <Text txColor={txColor} txSize={txSize}>
      {text}
    </Text>
  </Container>
);

export default Button;
