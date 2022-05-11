import React, { useContext } from "react";
import { View } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { Svg, Circle } from "react-native-svg";

import { getAperB } from "../../../utils/commonFuncs";
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
  color: ${(props) => props.theme.subColor};
  font-weight: bold;
`;

const UnitText = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 10px;
`;

const Section = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default BuoyListCard = ({
  latitude = null,
  longitude = null,
  model = null,
  model_idx = null,
}) => {
  const themeContext = useContext(ThemeContext);

  const isConn = parseInt(Math.random().toFixed(0));

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
      <Section>
        <View style={{ flex: 1 }}>
          <BouyName numberOfLines={1}>{model}</BouyName>
          <UnitText numberOfLines={1}>{model_idx}</UnitText>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Entypo
            name="dots-three-vertical"
            size={15}
            color={themeContext.utilColor}
          />
        </View>
      </Section>
    </Container>
  );
};
