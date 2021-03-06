import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Svg, Circle } from "react-native-svg";

import { getAperB } from "../../../utils/commonFuncs";
import RowBox from "../RowBox";
import SwipeWrapper from "../SwipeWrapper/SwipeWrapper";
import RSwipeWrapper from "../SwipeWrapper/RSwipeWrapper";

const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.mainColor};
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const NameView = styled.View`
  flex: 1;
`;
const InfoView = styled.View`
  flex: 2;
  flex-direction: row;
  justify-content: space-around;
`;
const TitleText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.theme.subColor};
`;
const SubText = styled.Text`
  font-size: 11px;
  color: ${(props) => props.theme.utilColor};
`;

const InfoText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-weight: bold;
  font-size: 11px;
`;
const InfoSubText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 13px;
`;
const ColBox = styled.View`
  align-items: center;
`;

export default GroupCard = ({
  onPressHandler,
  setModalVisible,
  setDeleteGroup,
  item,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container
      onPress={() => onPressHandler(item)}
      onLongPress={() => {
        setDeleteGroup({ groupName: item.group_name, groupId: item.group_id });
        setModalVisible(true);
      }}
    >
      <NameView>
        <TitleText>{item.group_name}</TitleText>
        <SubText>{item.region}</SubText>
      </NameView>
      <InfoView>
        <ColBox>
          <InfoText>수온</InfoText>
          <InfoSubText>{item.group_water_temp.toFixed(1)}º</InfoSubText>
        </ColBox>
        <ColBox>
          <InfoText>무게</InfoText>
          <InfoSubText>{item.group_weight.toFixed(1)}kg</InfoSubText>
        </ColBox>
        <ColBox>
          <InfoText>스마트부표</InfoText>
          <InfoSubText>{item.smart_buoy}개</InfoSubText>
        </ColBox>
      </InfoView>
    </Container>
  );
};
