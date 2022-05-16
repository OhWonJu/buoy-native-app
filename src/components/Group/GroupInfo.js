import React, { useContext, useState } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import DonutChart from "../DonutChart";
import ColBox from "../ColBox";
import RowBox from "../RowBox";

const Container = styled.View``;

const CapacityView = styled.View`
  padding: 5px 0px 15px 0px;
`;
const UtilInfoView = styled.View`
  background-color: ${(props) => props.theme.mainColor + 20};
  flex-direction: row;
  justify-content: space-around;
  padding: 18px 0px 18px 0px;
`;

const MainText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;
const SubText = styled.Text`
  color: ${(props) => props.theme.mainColor + 90};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;
const UnitText = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.mainColor + 90};
`;

export default GroupInfo = ({
  bouyCount = 0,
  group_weight = 0,
  group_water_temp = 0,
  group_salinity = 0,
  smart_buoy = 0,
  plain_buoy = 0,
}) => {
  const themeContext = useContext(ThemeContext);

  const [circleLen, setCircleLen] = useState(0);

  return (
    <Container
      style={{ backgroundColor: themeContext.idnColor }}
      pointerEvents="none"
    >
      {/* 수용량 그래프 뷰 */}
      <CapacityView>
        <RowBox
          style={{
            height: 140,
          }}
        >
          <View
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <MainText style={{ fontSize: 28, textAlign: "right" }}>
              수용량
            </MainText>
          </View>
          <View
            style={{ width: "60%" }}
            onLayout={(e) => {
              setCircleLen(parseInt(e.nativeEvent.layout.height));
            }}
          >
            <DonutChart
              percentage={group_weight.toFixed(1)}
              radius={circleLen / 2}
              duration={500}
              // color={themeContext.darkBlueColor}
              color={"#3163e1"}
              delay={800}
              textColor={themeContext.mainColor}
            />
          </View>
        </RowBox>
      </CapacityView>
      {/* 부가 정보 뷰 */}
      <UtilInfoView>
        <ColBox>
          <SubText>수온</SubText>
          <RowBox>
            <MainText>{group_water_temp.toFixed(1)}</MainText>
            <UnitText>º</UnitText>
          </RowBox>
        </ColBox>
        <ColBox>
          <SubText>염도</SubText>
          <RowBox style={{ alignItems: "flex-end" }}>
            <MainText>{group_salinity.toFixed(1)}</MainText>
            <UnitText>psu</UnitText>
          </RowBox>
        </ColBox>
        <ColBox>
          <SubText>스마트부표</SubText>
          <RowBox style={{ alignItems: "flex-end" }}>
            <MainText>{bouyCount}</MainText>
            <UnitText>/{bouyCount}</UnitText>
          </RowBox>
        </ColBox>
        <ColBox>
          <SubText>일반부표</SubText>
          <RowBox style={{ alignItems: "flex-end" }}>
            <MainText>{plain_buoy}</MainText>
            <UnitText>개</UnitText>
          </RowBox>
        </ColBox>
      </UtilInfoView>
    </Container>
  );
};
