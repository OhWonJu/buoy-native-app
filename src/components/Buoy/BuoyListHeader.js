import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import RowBox from "../RowBox";
import { shadows } from "../../../styles/GlobalStyles";

const Container = styled.View`
  height: 45px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 15px;
  background-color: ${(props) => props.theme.mainColor};
`;
const LeftText = styled.Text`
  font-weight: bold;
  font-size: 13px;
  color: ${(props) => props.theme.subColor};
`;

export default BuoyListHeader = ({ buoyCount = 0 }) => {
  const themeContext = useContext(ThemeContext);

  return (
    // tabbar height... 48
    <View style={[shadows.bottomShadow]}>
      <Container>
        <RowBox>
          <LeftText style={{ fontWeight: "bold", paddingRight: 3 }}>
            전체
          </LeftText>
          <LeftText style={{ color: themeContext.idnColor }}>
            {buoyCount}
          </LeftText>
        </RowBox>
        <RowBox>
          <TouchableOpacity>
            <Text>편집</Text>
          </TouchableOpacity>
        </RowBox>
      </Container>
      <Container style={{ height: 35, paddingBottom: 5 }}>
        <TouchableOpacity>
          <Text>다중선택</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="search" size={20} color="black" />
        </TouchableOpacity>
      </Container>
    </View>
  );
};
