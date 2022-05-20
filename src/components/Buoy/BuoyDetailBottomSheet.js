import React, { useCallback, useContext, useMemo, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import styled, { ThemeContext } from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

import RowBox from "../RowBox";
import { getAperB } from "../../../utils/commonFuncs";
import WarnCard from "./WarnCard";
import constants from "../../../constants";

const Container = styled.View`
  flex: 1;
`;
const HeaderSection = styled.View`
  height: ${constants.screenH * 0.08}px;
  padding: 0px 20px 0px 20px;
`;
const BuoyName = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 24px;
  font-weight: bold;
`;
const BuoySubName = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 12px;
`;
const InfoWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;
const InfoMainText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 23px;
  font-weight: bold;
`;
const InfoSubText = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 13px;
  top: 6%;
`;
const UnitText = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 10px;
`;
const MainSection = styled.View`
  flex: 1;
  min-height: 500px;
  padding: 0px 20px 0px 20px;
`;
const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.subColor};
`;
const Line = styled.View`
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.lightUtilColor};
  flex: 1;
  height: 1px;
`;
const WarnListView = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export default BuoyDetailBottomSheet = ({
  group_name,
  height,
  line,
  model,
  model_idx,
  salinity,
  warn,
  warn_detail,
  water_temp,
  weight,
}) => {
  const themeContext = useContext(ThemeContext);

  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["10%", "40%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
    >
      <Container>
        <HeaderSection>
          <RowBox style={{ justifyContent: "space-between" }}>
            <View style={{ flex: 1 }}>
              <RowBox style={{ alignItems: "flex-end" }}>
                <BuoyName style={{ paddingRight: 7 }}>{model}</BuoyName>
                <BuoySubName>{group_name}</BuoySubName>
              </RowBox>
              <BuoySubName style={{ fontSize: 10 }}>{model_idx}</BuoySubName>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <RowBox style={{ justifyContent: "space-around" }}>
                <InfoWrapper>
                  {typeof height === "number" && (
                    <>
                      <InfoSubText>침수</InfoSubText>
                      <RowBox style={{ alignItems: "flex-end", top: "-5%" }}>
                        <InfoMainText
                          style={{ color: getAperB(80, 80 - height) }}
                        >
                          {height.toFixed(1)}
                        </InfoMainText>
                        <UnitText>%</UnitText>
                      </RowBox>
                    </>
                  )}
                </InfoWrapper>
                <InfoWrapper>
                  {/* 수용률 관련 협의 필요. 전체 %를 할 것인지 무게 단위로 할 것인지 */}
                  {typeof weight === "number" && (
                    <>
                      <InfoSubText>하중</InfoSubText>
                      <RowBox style={{ alignItems: "flex-end", top: "-5%" }}>
                        <InfoMainText
                          style={{ color: getAperB(100, 100 - weight) }}
                        >
                          {weight.toFixed(1)}
                        </InfoMainText>
                        <UnitText>kg</UnitText>
                      </RowBox>
                    </>
                  )}
                </InfoWrapper>
              </RowBox>
            </View>
          </RowBox>
        </HeaderSection>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <MainSection>
            <RowBox style={{ alignItems: "center" }}>
              <TitleText>알람</TitleText>
              <Line style={{ marginLeft: 15 }} />
            </RowBox>
            <WarnListView>
              {warn > 0 && <WarnCard warnDetail={warn_detail} />}
            </WarnListView>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <TitleText>부표 그래프 보기</TitleText>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={34}
                color={themeContext.subColor}
              />
            </TouchableOpacity>
          </MainSection>
        </BottomSheetScrollView>
      </Container>
    </BottomSheet>
  );
};
