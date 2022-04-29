import React, { useContext } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Svg, Circle } from "react-native-svg";

import { getAperB } from "../../../commonFuncs";
import RowBox from "../RowBox";

const Container = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  border-bottom-color: ${(props) => props.theme.lightUtilColor};
  border-bottom-width: 1px;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
`;

const BouyName = styled.Text`
  background-color: ${(props) => props.theme.lightUtilColor + 80};
  padding: 3px 8px 3px 8px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  max-width: 30%;
`;

const InfoBox = styled.View`
  flex: 1;
  width: 60%;
  /* flex: 2; */
  flex-direction: row;
  justify-content: flex-end;
`;
const InfoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0px 10px 0px 15px;
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

  const isConn = parseInt(Math.random().toFixed(0));
  if (!isConn) {
    warn = 0;
    height = "--";
    // weight = "--";
  }

  return (
    <Container style={{ height: "100%" }}>
      <View
        style={{
          height: "100%",
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg height="8" width="8">
          <Circle
            cx={4}
            cy={4}
            r={3}
            fill={isConn === 1 ? themeContext.blueColor : themeContext.redColor}
          />
        </Svg>
      </View>
      <BouyName numberOfLines={1}>{model}</BouyName>
      <InfoBox>
        <InfoWrapper>
          {typeof height === "number" && (
            <>
              <InfoSubText>침수</InfoSubText>
              <RowBox style={{ alignItems: "flex-end" }}>
                <InfoMainText style={{ color: getAperB(40, 40 - height) }}>
                  {height.toFixed(1)}
                </InfoMainText>
                <UnitText>%</UnitText>
              </RowBox>
            </>
          )}
        </InfoWrapper>
        <InfoWrapper>
          {/* 수용률 관련 협의 필요. 전체 %를 할 것인지 무게 단위로 할 것인지 */}
          {typeof height === "number" && (
            <>
              <InfoSubText>하중</InfoSubText>
              <RowBox style={{ alignItems: "flex-end" }}>
                <InfoMainText style={{ color: getAperB(100, 100 - weight) }}>
                  {weight.toFixed(1)}
                </InfoMainText>
                <UnitText>kg</UnitText>
              </RowBox>
            </>
          )}
        </InfoWrapper>
        <InfoWrapper>
          {warn === 0 ? (
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={20}
              color={themeContext.lightUtilColor}
            />
          ) : (
            <MaterialCommunityIcons
              name="alert-circle"
              size={20}
              color={themeContext.orangeColor}
            />
          )}
        </InfoWrapper>
      </InfoBox>
    </Container>
  );
};
