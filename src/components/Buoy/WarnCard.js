import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import _ from "underscore";

export default WarnCard = ({ warnDetail }) => {
  // height, location, salinity, temp, weight
  const warnings = Object.values(warnDetail);
  const warningContext = ["침수", "위치", "염분", "수온", "하중"];
  const warnLevel = ["없음", "주의", "경고"];
  console.log(warnings);

  const RENDERITEM = ({ warn, context }) => (
    <View>
      <Text>
        {context} {warnLevel[warn]}
      </Text>
    </View>
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
