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
const ToggleText = styled.Text`
  font-size: 13px;
  color: ${(props) =>
    props.select ? props.theme.idnColor : props.theme.subColor};
`;

export default BuoyListHeader = ({
  buoyCount = 0,
  multiSelect,
  setMultiSelect,
  allSelect,
  setAllSelect,
}) => {
  const themeContext = useContext(ThemeContext);

  const onPressHandler = () => {
    setMultiSelect(!multiSelect);
    if (allSelect) {
      setAllSelect(false);
    }
  };

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
          {/* <TouchableOpacity>
            <Text>편집</Text>
          </TouchableOpacity> */}
        </RowBox>
      </Container>
      <Container style={{ height: 35, paddingBottom: 5 }}>
        <RowBox>
          <TouchableOpacity onPress={() => onPressHandler()}>
            <ToggleText select={multiSelect}>다중선택</ToggleText>
          </TouchableOpacity>
          {multiSelect && (
            <TouchableOpacity
              style={{ paddingLeft: 7 }}
              onPress={() => setAllSelect(!allSelect)}
            >
              <ToggleText select={allSelect}>
                {allSelect ? "선택해제" : "전체선택"}
              </ToggleText>
            </TouchableOpacity>
          )}
        </RowBox>
        {/* <TouchableOpacity>
          <Feather name="search" size={18} color="black" />
        </TouchableOpacity> */}
      </Container>
    </View>
  );
};
