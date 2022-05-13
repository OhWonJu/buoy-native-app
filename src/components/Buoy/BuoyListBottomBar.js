import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const Container = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  bottom: 0px;
  width: 100%;
  height: 58px;
  background-color: ${(props) => props.theme.idnColor};
`;
const Col = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: ${(props) => props.theme.mainColor};
  text-align: center;
  font-size: 10px;
`;
const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 5px 10px 3px 10px;
  justify-content: space-around;
`;

export default BuoyListBottomBar = ({
  seletedItem,
  setMultiSelect,
  goToGroupList,
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container>
      <Col>
        <Button onPress={() => goToGroupList(seletedItem)}>
          <Feather name="plus" size={26} color={themeContext.mainColor} />
          <Text>할당</Text>
        </Button>
      </Col>
      <Col>
        <Button onPress={() => setMultiSelect()}>
          <Feather
            name="plus"
            size={26}
            color={themeContext.mainColor}
            style={{ transform: [{ rotateZ: "45deg" }] }}
          />
          <Text>취소</Text>
        </Button>
      </Col>
    </Container>
  );
};
