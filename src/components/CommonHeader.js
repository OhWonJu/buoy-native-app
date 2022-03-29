import React, { useContext, useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { Ionicons } from "@expo/vector-icons";

import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.idnColor};
  height: 60px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Left = styled.View`
  flex: 2;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
`;
const Center = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Right = styled.View`
  flex: 2;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.mainColor};
  /* background-color: green; */
  padding-left: 5px;
  top: -1px;
`;

export default CommonHeader = ({
  title = "",
  color = "#4F678C",
  setHeaderHeight = () => null,
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height - constants.StatusBarHeight);
  }, []);

  const CONTAINER = ({ leftChildren = null, rightChildren = null }) => {
    return (
      <Container onLayout={headerOnLayout}>
        <Left>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={38} color={themeContext.mainColor} />
          </TouchableOpacity>
          <Title>{title}</Title>
        </Left>
        <Center></Center>
        <Right></Right>
      </Container>
    );
  };

  return <CONTAINER />;
};
