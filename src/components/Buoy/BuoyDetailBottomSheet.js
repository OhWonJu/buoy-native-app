import React, { useCallback, useContext, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import styled, { ThemeContext } from "styled-components";
import RowBox from "../RowBox";
import { getAperB } from "../../../utils/commonFuncs";

const Container = styled.View`
  flex: 1;
`;
const HeaderSection = styled.View`
  height: 10%;
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
  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["10%", "90%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    // <View style={styles.container}>
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
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
        <MainSection></MainSection>
      </Container>
    </BottomSheet>
    // </View>
  );
};
