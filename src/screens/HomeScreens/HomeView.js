import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { ThemeContext } from "styled-components/native";

import CommonContainer from "../../components/CommonContainer";
import { ClearDay } from "../../../styles/Icons";
import Waves from "../../components/Wave/Waves";
import TemperaturePage from "../../components/Home/TemperaturePage";
import Carousel from "../../components/Carousel";

const WeatherBox = styled.View`
  /* background-color: ${(props) => props.theme.mainColor + 20}; */
  border-radius: 15px;
  margin-bottom: 30px;
  padding: 10px;
  height: 170px;
  flex-direction: row;
  justify-content: space-between;
`;
const WeatherContext = styled.View`
  flex: 1;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
`;
const WeatherIconWrapper = styled.View`
  flex: 1;
  /* background-color: blue;   */
  justify-content: center;
  align-items: center;
`;

const OceanInfoBox = styled.View`
  margin-bottom: 15px;
  height: 280px;
  flex-direction: row;
`;
const OceanLeft = styled.View`
  background-color: ${(props) => props.theme.mainColor + 30};
  border-width: 1px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.mainColor + 50};
  flex: 1;
  margin-right: 10px;
`;
const OceanRightTop = styled.View`
  background-color: ${(props) => props.theme.mainColor + 30};
  border-width: 1px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.mainColor + 50};
  flex: 2;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;
const OceanRightBtm = styled.View`
  background-color: ${(props) => props.theme.mainColor + 30};
  border-width: 1px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.mainColor + 50};
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const BouyInfoBox = styled.View`
  background-color: ${(props) => props.theme.mainColor + 30};
  border-width: 1px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.mainColor + 50};
  border-radius: 15px;
  padding: 10px;
  height: 1000px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.mainColor};
`;

const MainText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 28px;
  font-weight: bold;
`;
const SubText = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 23px;
  font-weight: bold;
`;

const RowBox = styled.View`
  flex-direction: row;
`;

export default HomeView = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const [width, setWidth] = useState(0);

  return (
    <CommonContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WeatherBox>
          <WeatherContext>
            <Text style={{ fontSize: 75 }}>10º</Text>
            <RowBox>
              <Text style={{ fontSize: 25, textAlign: "center" }}>거제시</Text>
              {/* <Entypo
                name="location-pin"
                size={25}
                color={themeContext.mainColor}
                style={{ top: 3 }}
              /> */}
            </RowBox>
          </WeatherContext>
          <WeatherIconWrapper>
            <ClearDay />
          </WeatherIconWrapper>
        </WeatherBox>
        <OceanInfoBox>
          <OceanLeft>
            <Waves />
            <MainText
              style={{
                position: "absolute",
                left: "10%",
                top: "8%",
              }}
            >
              파고
            </MainText>
            <SubText
              style={{
                position: "absolute",
                left: "70%",
                top: "83%",
              }}
            >
              2m
            </SubText>
          </OceanLeft>
          <View style={{ flex: 1 }}>
            {/* 캐러셀 박스 */}
            <OceanRightTop
              onLayout={(e) => {
                setWidth(e.nativeEvent.layout.width);
              }}
            >
              <Carousel
                data={[
                  { temperature: 12.2, type: "water" },
                  { temperature: 15.3, type: "atmo" },
                ]}
                pageWidth={width}
              />
            </OceanRightTop>
            {/* ------------ */}
            <OceanRightBtm>
              <SubText>추가 정보</SubText>
              <SubText>-</SubText>
            </OceanRightBtm>
          </View>
        </OceanInfoBox>
        <BouyInfoBox></BouyInfoBox>
      </ScrollView>
    </CommonContainer>
  );
};
