import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

const Container = styled.View`
  width: ${(props) => props.width}px;
  height: 100%;
  align-items: center;
  padding: 10px;
  justify-content: center;
`;

const MainText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 28px;
  font-weight: bold;
`;
const SubText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 23px;
  font-weight: bold;
`;

export default UtilsInfoPage = ({ width, title, context }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container width={width}>
      <SubText>{title}</SubText>
      <MainText>{context}</MainText>
    </Container>
  );
};
