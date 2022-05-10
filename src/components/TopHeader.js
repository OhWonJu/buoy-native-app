import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

import constants from "../../constants";

const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.mainColor};
  /* height: ${constants.StatusBarHeight + 40}px; */
  height: 40px;
  /* padding-top: ${constants.StatusBarHeight + 5}px; */
  width: 100%;
  justify-content: center;
  align-items: center;
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
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.titleColor};
  bottom: 20%;
`;

export default TopHeader = ({
  setHeaderHeight,
  title = null,
  titleColor = "#262626",
  leftOnPress = () => null,
}) => {
  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  return (
    <Container onLayout={headerOnLayout}>
      <Title titleColor={titleColor}>{title}</Title>
      <Left>
        <TouchableOpacity onPress={leftOnPress}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color={titleColor}
            style={{ paddingLeft: 15 }}
          />
        </TouchableOpacity>
      </Left>
      <Mid></Mid>
      <Right></Right>
    </Container>
  );
};
