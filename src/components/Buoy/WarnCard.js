import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import _ from "underscore";

const CardContainer = styled.View`
  flex-direction: row;
  padding: 10px 0px 10px 0px;
  align-items: center;
  justify-content: space-between;
`;
const WarnLevelBox = styled.View`
  background-color: ${(props) =>
    props.warn === 1 ? props.theme.orangeColor : props.theme.redColor};
  padding: 7px;
  border-radius: 5px;
`;
const WarnLevelText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 12px;
`;
const WarnTypeText = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-weight: bold;
  font-size: 16px;
`;
const WarnContext = styled.Text`
  color: ${(props) => props.theme.subColor};
  font-size: 14px;
`;
const WarnTimeText = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 10px;
`;

export default WarnCard = ({ warnDetail }) => {
  // height, location, salinity, temp, weight
  const warnings = Object.values(warnDetail);
  const warningContext = ["침수", "위치", "염분", "수온", "하중"];
  const warnLevel = ["없음", "주의", "경고"];

  const RENDERITEM = ({ warn, context }) => (
    <CardContainer>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <WarnLevelBox warn={warn}>
          <WarnLevelText>{warnLevel[warn]}</WarnLevelText>
        </WarnLevelBox>
        <WarnTypeText>{context}</WarnTypeText>
        <WarnContext>기준치 --% 초과</WarnContext>
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <WarnTimeText>YY:MM:DD:HH</WarnTimeText>
      </View>
    </CardContainer>
  );

  return warnings.map((warn, index) => {
    if (warn > 0) {
      return (
        <RENDERITEM
          key={index}
          warn={warn}
          context={warningContext[index]}
        ></RENDERITEM>
      );
    }
  });
};
