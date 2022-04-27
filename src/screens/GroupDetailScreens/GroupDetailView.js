import React, { useState, useContext, useCallback, useRef } from "react";
import { View, TouchableOpacity, SafeAreaView, Animated } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../constants";
import GroupInfo from "../../components/Group/GroupInfo";
import GroupMap from "../../components/Group/GroupMap";
import Header from "../../components/Header";
import TypeModal from "../../components/Group/TypeModal";
import GroupGraphTab from "../../components/Group/GroupGraphTab";
import ColBox from "../../components/ColBox";
import SwipeWrapper from "../../components/SwipeWrapper/SwipeWrapper";
import BouyCard from "../../components/Group/BouyCard";
import CollapsibleHeader from "../../components/CollapsibleView/CollapsibleHeader";
import CollapsibleFlatList from "../../components/CollapsibleView/CollapsibleFlatList";

const LINEHEADER_HEIGHT = 45 + constants.StatusBarHeight;

const RowBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LineHeader = styled(Animated.View)`
  height: ${LINEHEADER_HEIGHT}px;
  padding: 0px 15px 10px 15px;
  background-color: ${(props) => props.theme.mainColor};
  flex-direction: row;
  align-items: flex-end;
  z-index: 1;
`;

const EditText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.mainColor};
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.subColor};
`;

export default GroupDetailView = ({
  navigation,
  route,
  headerHeight,
  setHeaderHeight,
  typeModalVisible,
  setTypeModalVisible,
  typeModeIndex,
  setTypeModeIndex,
  typeModeText,
  bouyData,
  setBouyData,
  groupInfo,
  setGroupInfo,
}) => {
  const themeContext = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });
  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: "clamp",
  });

  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  const RENDERITEM = ({ item }) => {
    return (
      <SwipeWrapper
        key={item.model}
        onSwipe={() => {
          const newData = [...bouyData];
          newData.splice(newData.indexOf(item), 1);
          setBouyData(newData);
        }}
        HEIGHT={70}
      >
        <TouchableOpacity onPress={() => null}>
          <BouyCard {...item} />
        </TouchableOpacity>
      </SwipeWrapper>
    );
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: themeContext.mainColor }}>
        {headerHeight > 0 && (
          <>
            <LineHeader
              pointerEvents="box-none"
              style={{ transform: [{ translateY: tabBarTranslateY }] }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <ColBox
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Title>부이 정보</Title>
                </ColBox>
                <ColBox
                  style={{
                    padding: 3,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity>
                    <EditText
                      style={{
                        fontWeight: "bold",
                        color: themeContext.idnColor,
                      }}
                    >
                      부이 추가
                    </EditText>
                  </TouchableOpacity>
                </ColBox>
              </View>
            </LineHeader>
            <CollapsibleFlatList
              headerHeight={headerHeight}
              scrollY={scrollY}
              data={bouyData}
              renderItem={RENDERITEM}
              onEndReachedThreshold={0.1}
              onEndReached={() => null}
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingBottom: LINEHEADER_HEIGHT,
              }}
            />
          </>
        )}

        {/* pointerEvents="box-none"가 상속이 안되는 이슈.... */}
        <CollapsibleHeader
          onLayout={headerOnLayout}
          headerTranslateY={headerTranslateY}
        >
          <Header
            title={groupInfo.group_name}
            rightChildren={
              <RowBox>
                <EditText style={{ fontSize: 12, paddingRight: 10 }}>
                  {groupInfo.region}
                </EditText>
                <TouchableOpacity onPress={() => setTypeModalVisible(true)}>
                  <EditText style={{ fontWeight: "bold" }}>
                    {typeModeText[typeModeIndex]}
                  </EditText>
                </TouchableOpacity>
              </RowBox>
            }
          />
          <GroupInfo data={groupInfo} />
          {/* 그래프 관련도 무엇을 보여줄지 협의 필요.. */}
          <GroupGraphTab />
          <GroupMap />
        </CollapsibleHeader>
      </SafeAreaView>
      <TypeModal
        modalVisible={typeModalVisible}
        setModalVisible={setTypeModalVisible}
        typeModeIndex={typeModeIndex}
        setTypeModeIndex={setTypeModeIndex}
        typeModeText={typeModeText}
      />
    </>
  );
};
