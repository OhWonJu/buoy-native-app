import React, { useContext, useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import constants from "../../constants";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  background-color: ${(props) => props.theme.idnColor};
  padding: 10px 15px 10px 15px;
`;

const Header = styled.View`
  flex-direction: row;
  /* padding: 5px; */
  padding-top: ${constants.StatusBarHeight}px;
  padding-left: 10px;
  justify-content: center;
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

export default ({
  title = "",
  color = "#7FA7D3",
  leftChildren = null,
  rightChildren = null,
  setHeaderHeight = () => null,
}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height - constants.StatusBarHeight);
  }, []);

  const CONTAINER = () => {
    return (
      <Container onLayout={headerOnLayout} pointerEvents="box-none">
        <Header>
          <Left>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons
                name="menu"
                size={20}
                color={themeContext.mainColor}
                style={{ paddingRight: 15 }}
              />
            </TouchableOpacity>
            <Title>{title}</Title>
            {leftChildren}
          </Left>
          <Center></Center>
          <Right>{rightChildren}</Right>
        </Header>
      </Container>
    );
  };

  return <CONTAINER />;
};
