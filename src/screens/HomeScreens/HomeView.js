import React, { useContext } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import CommonHeader from "../../components/CommonHeader";
// import Container from "../../components/Container";
import HomeTopTabNav from "../../navigators/HomeTopTabNav";
import { ThemeContext } from "styled-components";
import constants from "../../../constants";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.idnColor};
  padding: 10px 15px 5px 15px;
`;

const Header = styled.View`
  height: 8%;
  margin-top: 10px;
  padding-left: 10px;
  /* background-color: red; */
  justify-content: center;
`;

export default HomeView = ({ headerHeight, setHeaderHeight }) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <>
      <Container>
        <Header>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <SimpleLineIcons
              name="menu"
              size={20}
              color={themeContext.mainColor}
            />
          </TouchableOpacity>
        </Header>
      </Container>
    </>
  );
};
