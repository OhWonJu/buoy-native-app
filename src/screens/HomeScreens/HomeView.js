import React, { useContext } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled, { ThemeContext } from "styled-components/native";

import CommonContainer from "../../components/CommonContainer";
import { ClearDay } from "../../../styles/Icons";
import Waves from "../../components/Wave/Waves";
import TemperaturePage from "../../components/Home/TemperaturePage";
import UtilsInfoPage from "../../components/Home/UtilsInfoPage";
import Carousel from "../../components/Carousel";
import DonutChart from "../../components/DonutChart";
import { MockData } from "../../../MockData";

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
  color: ${(props) => props.theme.lightUtilColor + 90};
`;

export default HomeView = ({
  meteoVal,
  obsData,
  tidal,
  groupTotal,
  refreshing,
  onRefresh,
  waveHight,
  rTwidth,
  rTsetWidth,
  rBwidth,
  rBsetWidth,
  circleLen,
  setCircleLen,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CommonContainer style={{ paddingBottom: 0 }}>
        <WeatherBox>
          <WeatherContext>
            <Text style={{ fontSize: 75 }}>{meteoVal.data.temperature}??</Text>
            <RowBox>
              <Text
                style={{
                  fontSize: meteoVal.region.lenght < 7 ? 25 : 22,
                  textAlign: "center",
                }}
              >
                {meteoVal.region}
              </Text>
            </RowBox>
          </WeatherContext>
          <WeatherIconWrapper>
            <ClearDay />
          </WeatherIconWrapper>
        </WeatherBox>
        <OceanInfoBox>
          <OceanLeft>
            <Waves wavy={parseFloat(waveHight.wave_height).toFixed(1)} />
            <MainText
              style={{
                position: "absolute",
                left: "10%",
                top: "8%",
              }}
            >
              ??????
            </MainText>
            <View style={{ top: "-20%", alignItems: "flex-end" }}>
              <SubText
                style={{
                  paddingRight: 15,
                  fontSize: 30,
                  position: "absolute",
                  // left: "50%",
                }}
              >
                {parseFloat(waveHight.wave_height).toFixed(1)}m
              </SubText>
            </View>
          </OceanLeft>
          <View style={{ flex: 1 }}>
            {/* ????????? ?????? */}
            <OceanRightTop
              onLayout={(e) => {
                rTsetWidth(e.nativeEvent.layout.width);
              }}
            >
              <Carousel
                data={[
                  {
                    temperature: groupTotal.water_temp.toFixed(1),
                    type: "water",
                  },
                  { temperature: meteoVal.data.temperature, type: "atmo" },
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
                <UtilsInfoPage
                  width={rBwidth}
                  title={"??????"}
                  context={`${groupTotal.salinity.toFixed(1)}psu`}
                />
                <UtilsInfoPage
                  width={rBwidth}
                  title={"??????"}
                  context={`${parseFloat(obsData.wind_speed).toFixed(1)}m/s`}
                />
                <UtilsInfoPage
                  width={rBwidth}
                  title={"?????? ??????"}
                  context={`${parseFloat(tidal.current_speed).toFixed(1)}cm/s`}
                />
              </ScrollView>
            </OceanRightBtm>
          </View>
        </OceanInfoBox>
        <BouyInfoBox>
          <MainText>?????? ??????</MainText>
          {/* ?????? ????????? */}
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
              <SubText>?????????</SubText>
            </View>
            <View
              style={{ width: "70%" }}
              onLayout={(e) => {
                setCircleLen(parseInt(e.nativeEvent.layout.height));
              }}
            >
              <DonutChart
                percentage={groupTotal.weight.toFixed(1)}
                radius={circleLen / 2}
                duration={800}
                // color={themeContext.darkBlueColor}
                color={"#3163e1"}
                delay={1000}
                textColor={themeContext.mainColor}
              />
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
            {/* ????????? ?????? */}
            <View>
              <TotalTitle>????????? ??????</TotalTitle>
              <RowBox style={{ alignItems: "flex-end" }}>
                <SubText>{groupTotal.smart_buoy}</SubText>
                <TotalUnit>{groupTotal.smart_buoy}</TotalUnit>
              </RowBox>
            </View>
            {/* ?????? ?????? */}
            <View>
              <Text style={{ fontSize: 16 }}>?????? ??????</Text>
              <RowBox style={{ alignItems: "flex-end" }}>
                <SubText>{groupTotal.plain_buoy}</SubText>
                <TotalUnit>???</TotalUnit>
              </RowBox>
            </View>
            {/* ????????? */}
            <View>
              <Text style={{ fontSize: 16 }}>??????</Text>
              <RowBox style={{ alignItems: "flex-end" }}>
                <SubText>{groupTotal.group_count}</SubText>
                <TotalUnit>??????</TotalUnit>
              </RowBox>
            </View>
          </RowBox>
        </BouyInfoBox>
      </CommonContainer>
    </ScrollView>
  );
};
