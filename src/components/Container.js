import React from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px 10px 5px 10px;
`;

export default ({ children, style }) => {
  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };

  return (
    <Container activeOpacity={1} onPress={dismissKeyBoard} style={style}>
      {children}
    </Container>
  );
};
