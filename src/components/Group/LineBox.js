import React from "react";
import styled from "styled-components/native";
import RowBox from "../RowBox";
import constants from "../../../constants";
import { getAperB } from "../../../commonFuncs";

const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.mainColor};
  border-bottom-color: ${(props) => props.theme.lightUtilColor};
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LineName = styled.Text`
  background-color: ${(props) => props.theme.utilColor + 35};
  padding: 3px 8px 3px 8px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  max-width: 30%;
`;

const InfoBox = styled.View`
  width: 70%;
  flex-direction: row;
  justify-content: space-around;
`;
const InfoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0px 0px 0px 12px;
`;
const InfoMainText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 15px;
  font-weight: bold;
`;
const InfoSubText = styled.Text`
  color: ${(props) => props.theme.subColor + 80};
  font-size: 12px;
`;
const UnitText = styled.Text`
  color: ${(props) => props.theme.subColor + 80};
  font-size: 10px;
`;

export default LineBox = ({ item }) => {
  return (
    <Container style={{ height: "100%" }} activeOpacity={1}>
      <LineName numberOfLines={1}>Line {item.name}</LineName>
      <InfoBox>
        <InfoWrapper>
          <InfoSubText>스마트부표</InfoSubText>
          <RowBox style={{ alignItems: "flex-end" }}>
            <InfoMainText
              style={{ color: getAperB(item.totalBouy, item.activeBouy) }}
            >
              {item.activeBouy}
            </InfoMainText>
            <UnitText>/{item.totalBouy}</UnitText>
          </RowBox>
        </InfoWrapper>
        <InfoWrapper>
          <InfoSubText>일반부표</InfoSubText>
          <InfoMainText>{item.normalBouy}</InfoMainText>
        </InfoWrapper>
        <InfoWrapper>
          <InfoSubText>수용률</InfoSubText>
          <RowBox style={{ alignItems: "flex-end" }}>
            <InfoMainText style={{ color: getAperB(1, 1 - item.capacity) }}>
              {(item.capacity * 100).toFixed(0)}
            </InfoMainText>
            <UnitText>%</UnitText>
          </RowBox>
        </InfoWrapper>
      </InfoBox>
    </Container>
  );
};
