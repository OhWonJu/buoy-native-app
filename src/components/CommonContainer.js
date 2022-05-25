import React, { useContext } from "react";
import { TouchableOpacity, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { ThemeContext } from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import constants from "../../constants";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.idnColor};
  padding: 10px 15px 5px 15px;
`;

const Header = styled.View`
  margin-top: ${constants.StatusBarHeight}px;
  padding: 5px;
  /* padding-left: 10px; */
  justify-content: center;
`;

export default ({ children, style }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <Container activeOpacity={1} onPress={dismissKeyboard} style={style}>
        <Header>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <SimpleLineIcons
              name="menu"
              size={20}
              color={themeContext.mainColor}
            />
          </TouchableOpacity>
        </Header>
        {children}
      </Container>
    </>
  );
};
