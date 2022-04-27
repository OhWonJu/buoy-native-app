import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { getAperB } from "../../../commonFuncs";
import RowBox from "../RowBox";

const Container = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  border-bottom-color: ${(props) => props.theme.lightUtilColor};
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BouyName = styled.Text`
  background-color: ${(props) => props.theme.utilColor + 35};
  padding: 3px 8px 3px 8px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  max-width: 30%;
`;

const InfoBox = styled.View`
  width: 60%;
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

export default BouyCard = ({
  latitude,
  longitude,
  model,
  model_idx,
  salinity,
  warn,
  warn_detail,
  water_temp,
  height,
  weight,
}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container style={{ height: "100%" }}>
      <BouyName numberOfLines={1}>{model}</BouyName>
      <InfoBox>
        <InfoWrapper>
          <InfoSubText>침식</InfoSubText>
          <RowBox style={{ alignItems: "flex-end" }}>
            <InfoMainText style={{ color: getAperB(40, 40 - height) }}>
              {height.toFixed(1)}
            </InfoMainText>
            <UnitText>%</UnitText>
          </RowBox>
        </InfoWrapper>
        <InfoWrapper>
          <InfoSubText>하중</InfoSubText>
          <RowBox style={{ alignItems: "flex-end" }}>
            {/* 수용률 관련 협의 필요. 전체 %를 할 것인지 무게 단위로 할 것인지 */}
            <InfoMainText style={{ color: getAperB(100, 100 - weight) }}>
              {weight.toFixed(1)}
            </InfoMainText>
            <UnitText>kg</UnitText>
          </RowBox>
        </InfoWrapper>
        <InfoWrapper>
          {warn === 0 ? (
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={24}
              color={themeContext.lightUtilColor}
            />
          ) : (
            <MaterialCommunityIcons
              name="alert-circle"
              size={24}
              color={themeContext.orangeColor}
            />
          )}
        </InfoWrapper>
      </InfoBox>
    </Container>
  );
};
