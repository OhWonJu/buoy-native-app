import React, { useState, useContext, useCallback, useRef } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StyleSheet,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import MapView, { Marker, Polygon } from "react-native-maps";

import constants from "../../../constants";
import GroupInfo from "../../components/Group/GroupInfo";
import GroupMap from "../../components/Group/GroupMap";
import Header from "../../components/Header";
import TypeModal from "../../components/Modals/TypeModal";
import GroupGraphTab from "../../components/Group/GroupGraphTab";
import ColBox from "../../components/ColBox";
import SwipeWrapper from "../../components/SwipeWrapper/SwipeWrapper";
import BouyCard from "../../components/Group/BouyCard";
import CollapsibleHeader from "../../components/CollapsibleView/CollapsibleHeader";
import CollapsibleFlatList from "../../components/CollapsibleView/CollapsibleFlatList";
import NameEditModal from "../../components/Modals/NameEditModal";

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
  editNameModalVisible,
  setEditNameModalVisible,
  editName,
  typeModalVisible,
  setTypeModalVisible,
  typeModeIndex,
  setTypeModeIndex,
  typeModeText,
  bouyData,
  groupInfo,
  setGroupInfo,
  onSwipe,
  onEndReached,
  refreshing,
  onRefresh,
  goToBouyDetail,
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

  let longitudes = bouyData.map((bouy) => bouy.longitude);
  let latitudes = bouyData.map((bouy) => bouy.latitude);

  const points = [];
  points.push({
    longitude: Math.min(...longitudes),
    latitude: Math.min(...latitudes),
  });
  points.push({
    longitude: Math.min(...longitudes),
    latitude: Math.max(...latitudes),
  });
  points.push({
    longitude: Math.max(...longitudes),
    latitude: Math.max(...latitudes),
  });
  points.push({
    longitude: Math.max(...longitudes),
    latitude: Math.min(...latitudes),
  });

  const RENDERITEM = ({ item, index }) => {
    return (
      <BouyCard
        key={item.model}
        index={index}
        onSwipe={onSwipe}
        goToBouyDetail={goToBouyDetail}
        {...item}
      />
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
              onEndReached={onEndReached}
              refreshing={refreshing}
              onRefresh={onRefresh}
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
            leftChildren={
              <TouchableOpacity onPress={() => setEditNameModalVisible(true)}>
                <EditText
                  numberOfLines={1}
                  style={{
                    fontSize: groupInfo.group_name.length < 13 ? 24 : 18,
                    fontWeight: "bold",
                  }}
                >
                  {groupInfo.group_name}
                </EditText>
              </TouchableOpacity>
            }
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
          <GroupInfo bouyCount={bouyData.length} {...groupInfo} />
          {/* 그래프 관련도 무엇을 보여줄지 협의 필요.. */}
          <GroupGraphTab />
          <GroupMap />
          <View style={{ paddingHorizontal: 15, marginTop: 35 }}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: points[0].latitude,
                longitude: points[0].longitude,
                latitudeDelta: 0.00722,
                longitudeDelta: 0.00221,
              }}
              mapType={"hybrid"}
              showsUserLocation={true}
            >
              <Polygon
                coordinates={points}
                fillColor={themeContext.greenColor + 80}
                strokeColor="rgba(0, 200, 0, 0)" // fallback for when `strokeColors` is not supported by the map-provider
              />
            </MapView>
          </View>
        </CollapsibleHeader>
      </SafeAreaView>
      {editNameModalVisible && (
        <NameEditModal
          modalVisible={editNameModalVisible}
          setModalVisible={setEditNameModalVisible}
          oldName={groupInfo.group_name}
          confirm={editName}
        />
      )}
      {typeModalVisible && (
        <TypeModal
          modalVisible={typeModalVisible}
          setModalVisible={setTypeModalVisible}
          typeModeIndex={typeModeIndex}
          setTypeModeIndex={setTypeModeIndex}
          typeModeText={typeModeText}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: constants.screenW - 30,
  },
});
