import React, { useContext, useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { ThemeContext } from "styled-components/native";
import { Svg, Path, Circle } from "react-native-svg";

import CommonContainer from "../../components/CommonContainer";
import { ClearDay } from "../../../styles/Icons";
import Waves from "../../components/Wave/Waves";
import TemperaturePage from "../../components/Home/TemperaturePage";
import UtilsInfoPage from "../../components/Home/UtilsInfoPage";
import Carousel from "../../components/Carousel";
import constants from "../../../constants";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

const WeatherBox = styled.View`
  /* background-color: ${(props) => props.theme.mainColor + 20}; */
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 10px;
  height: 20%;
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
  height: 30%;
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
`;
const BouyInfoBox = styled.View`
  background-color: ${(props) => props.theme.mainColor + 30};
  border-width: 1px;
  border-radius: 15px;
  border-color: ${(props) => props.theme.mainColor + 50};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: 10px 20px 10px 20px;
  flex: 1;
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

const TotalTitle = styled.Text`
  color: ${(props) => props.theme.mainColor};
  font-size: 14px;
`;
const TotalUnit = styled.Text`
  font-size: 13px;
  font-weight: normal;
  color: ${(props) => props.theme.lightUtilColor};
`;

export default HomeView = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const [rTwidth, rTsetWidth] = useState(0);
  const [rBwidth, rBsetWidth] = useState(0);
  const [circleLen, setCircleLen] = useState(0);

  return (
    <CommonContainer style={{ paddingBottom: 0 }}>
      <WeatherBox>
        <WeatherContext>
          <Text style={{ fontSize: 75 }}>10º</Text>
          <RowBox>
            <Text style={{ fontSize: 25, textAlign: "center" }}>거제시</Text>
          </RowBox>
        </WeatherContext>
        <WeatherIconWrapper>
          <ClearDay />
        </WeatherIconWrapper>
      </WeatherBox>
      <OceanInfoBox>
        <OceanLeft>
          <Waves wavy={2} />
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
              fontSize: 30,
              position: "absolute",
              left: "68%",
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
              rTsetWidth(e.nativeEvent.layout.width);
            }}
          >
            <Carousel
              data={[
                { temperature: 12.2, type: "water" },
                { temperature: 15.3, type: "atmo" },
              ]}
              pageWidth={rTwidth}
              renderItem={({ item }) => (
                <TemperaturePage width={rTwidth} {...item} />
              )}
            />
          </OceanRightTop>
          {/* ------------ */}
          <OceanRightBtm
            onLayout={(e) => {
              rBsetWidth(e.nativeEvent.layout.width);
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={"fast"}
              snapToInterval={rBwidth}
              pagingEnabled={true}
            >
              <UtilsInfoPage width={rBwidth} title={"염도"} context={"3.2%"} />
              <UtilsInfoPage
                width={rBwidth}
                title={"풍속"}
                context={"3.5cm/s"}
              />
              <UtilsInfoPage
                width={rBwidth}
                title={"조류 속도"}
                context={"3.2cm/s"}
              />
            </ScrollView>
          </OceanRightBtm>
        </View>
      </OceanInfoBox>
      <BouyInfoBox>
        <MainText>부표 현황</MainText>
        {/* 서클 그래프 */}
        <RowBox
          style={{
            height: "60%",
            // marginBottom: 15,
          }}
        >
          <View
            style={{
              width: "30%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <SubText>수용량</SubText>
            <MainText style={{ fontSize: 40 }}>20%</MainText>
          </View>
          <View
            style={{ width: "70%" }}
            onLayout={(e) => {
              setCircleLen(parseInt(e.nativeEvent.layout.height * 2));
            }}
          >
            <Svg>
              <Circle
                cx={"50%"}
                cy={"50%"}
                r={circleLen / (2 * Math.PI)}
                stroke={themeContext.mainColor + 60}
                strokeWidth={13}
              />
              <Circle
                cx={"50%"}
                cy={"50%"}
                r={circleLen / (2 * Math.PI)}
                stroke={themeContext.blueColor}
                strokeWidth={13}
                strokeDasharray={circleLen}
                strokeDashoffset={circleLen * (1 - 0.2)}
              />
            </Svg>
          </View>
        </RowBox>
        {/* -------- */}
        <RowBox
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* 스마트 부표 */}
          <View>
            <TotalTitle>스마트 부표</TotalTitle>
            <RowBox style={{ alignItems: "flex-end" }}>
              <SubText>80</SubText>
              <TotalUnit>/100</TotalUnit>
            </RowBox>
          </View>
          {/* 일반 부표 */}
          <View>
            <Text style={{ fontSize: 16 }}>일반 부표</Text>
            <RowBox style={{ alignItems: "flex-end" }}>
              <SubText>500</SubText>
              <TotalUnit>개</TotalUnit>
            </RowBox>
          </View>
          {/* 구역수 */}
          <View>
            <Text style={{ fontSize: 16 }}>구역</Text>
            <RowBox style={{ alignItems: "flex-end" }}>
              <SubText>10</SubText>
              <TotalUnit>개소</TotalUnit>
            </RowBox>
          </View>
        </RowBox>
      </BouyInfoBox>
    </CommonContainer>
  );
};
