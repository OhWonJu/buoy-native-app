import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import constants from "../../../constants";

const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.authThemeColor};
  height: ${constants.StatusBarHeight + 60}px;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-style: solid;
`;
const Left = styled.View`
  flex: 1;
`;
const Mid = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
`;
const Right = styled.View`
  flex: 2;
`;

const Title = styled.Text`
  position: absolute;
  font-size: 23px;
  font-weight: 700;
  color: ${(props) => props.titleColor};
  bottom: 20%;
`;

export default AuthHeader = ({
  title = null,
  titleColor = "#E1E1E1",
  bgColor,
  leftOnPress = () => null,
}) => {
  return (
    <Container bgColor={bgColor}>
      <Title titleColor={titleColor}>{title}</Title>
      <Left>
        <TouchableOpacity onPress={leftOnPress}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={38}
            color={titleColor}
          />
        </TouchableOpacity>
      </Left>
      <Mid></Mid>
      <Right></Right>
    </Container>
  );
};
