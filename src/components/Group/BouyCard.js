import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Svg, Circle } from "react-native-svg";
import * as Notifications from "expo-notifications";

import { getAperB } from "../../../utils/commonFuncs";
import RowBox from "../RowBox";
import SwipeWrapper from "../SwipeWrapper/SwipeWrapper";
import RSwipeWrapper from "../SwipeWrapper/RSwipeWrapper";

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
  color: ${(props) => props.theme.utilColor};
  font-size: 12px;
`;
const UnitText = styled.Text`
  color: ${(props) => props.theme.utilColor};
  font-size: 10px;
`;

export default BouyCard = ({
  index = 0,
  onSwipe = () => null,
  goToBuoyDetail,
  latitude = null,
  longitude = null,
  model = null,
  model_idx = null,
  salinity = null,
  warn = null,
  warn_detail = null,
  water_temp = null,
  height = null,
  weight = null,
}) => {
  const themeContext = useContext(ThemeContext);

  const isConn = parseInt(Math.random().toFixed(0));
  if (!isConn) {
    warn = 0;
    height = "--";
    weight = "--";
  }

  // return (
  //   <SwipeWrapper onSwipe={() => onSwipe(model, index)} HEIGHT={65}>
  //     <TouchableOpacity
  //       onPress={() => goToBouyDetail({ model, latitude, longitude })}
  //     >
  //       <Container style={{ height: "100%" }}>
  //         <View
  //           style={{
  //             height: "100%",
  //             paddingHorizontal: 10,
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Svg height="8" width="8">
  //             <Circle
  //               cx={4}
  //               cy={4}
  //               r={3}
  //               fill={
  //                 isConn === 1 ? themeContext.blueColor : themeContext.redColor
  //               }
  //             />
  //           </Svg>
  //         </View>
  //         <BouyName numberOfLines={1}>{model}</BouyName>
  //         <InfoBox>
  //           <InfoWrapper>
  //             {typeof height === "number" && (
  //               <>
  //                 <InfoSubText>??????</InfoSubText>
  //                 <RowBox style={{ alignItems: "flex-end" }}>
  //                   <InfoMainText style={{ color: getAperB(40, 40 - height) }}>
  //                     {height.toFixed(1)}
  //                   </InfoMainText>
  //                   <UnitText>%</UnitText>
  //                 </RowBox>
  //               </>
  //             )}
  //           </InfoWrapper>
  //           <InfoWrapper>
  //             {/* ????????? ?????? ?????? ??????. ?????? %??? ??? ????????? ?????? ????????? ??? ????????? */}
  //             {typeof height === "number" && (
  //               <>
  //                 <InfoSubText>??????</InfoSubText>
  //                 <RowBox style={{ alignItems: "flex-end" }}>
  //                   <InfoMainText
  //                     style={{ color: getAperB(100, 100 - weight) }}
  //                   >
  //                     {weight.toFixed(1)}
  //                   </InfoMainText>
  //                   <UnitText>kg</UnitText>
  //                 </RowBox>
  //               </>
  //             )}
  //           </InfoWrapper>
  //           <InfoWrapper>
  //             {warn === 0 ? (
  //               <MaterialCommunityIcons
  //                 name="alert-circle-outline"
  //                 size={20}
  //                 color={themeContext.lightUtilColor}
  //               />
  //             ) : (
  //               <MaterialCommunityIcons
  //                 name="alert-circle"
  //                 size={20}
  //                 color={themeContext.orangeColor}
  //               />
  //             )}
  //           </InfoWrapper>
  //         </InfoBox>
  //       </Container>
  //     </TouchableOpacity>
  //   </SwipeWrapper>
  // );

  return (
    <RSwipeWrapper onSwipe={() => onSwipe(model, index)} height={65}>
      <TouchableOpacity activeOpacity={1} onPress={() => goToBuoyDetail(model)}>
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
                fill={
                  isConn === 1 ? themeContext.blueColor : themeContext.redColor
                }
              />
            </Svg>
          </View>
          <BouyName numberOfLines={1}>{model}</BouyName>
          <InfoBox>
            <InfoWrapper>
              {typeof height === "number" && (
                <>
                  <InfoSubText>??????</InfoSubText>
                  <RowBox style={{ alignItems: "flex-end" }}>
                    <InfoMainText style={{ color: getAperB(80, 80 - height) }}>
                      {height.toFixed(1)}
                    </InfoMainText>
                    <UnitText>%</UnitText>
                  </RowBox>
                </>
              )}
            </InfoWrapper>
            <InfoWrapper>
              {/* ????????? ?????? ?????? ??????. ?????? %??? ??? ????????? ?????? ????????? ??? ????????? */}
              {typeof weight === "number" && (
                <>
                  <InfoSubText>??????</InfoSubText>
                  <RowBox style={{ alignItems: "flex-end" }}>
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
            <InfoWrapper>
              {warn === 0 ? (
                <MaterialCommunityIcons
                  name="alert-circle-outline"
                  size={20}
                  color={themeContext.lightUtilColor}
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    Notifications.scheduleNotificationAsync({
                      content: {
                        title: "?????? Warning Test",
                        body: "Buoy has some warning.",
                      },
                      trigger: {
                        seconds: 3,
                      },
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name="alert-circle"
                    size={20}
                    color={themeContext.orangeColor}
                  />
                </TouchableOpacity>
              )}
            </InfoWrapper>
          </InfoBox>
        </Container>
      </TouchableOpacity>
    </RSwipeWrapper>
  );
};
