import React, { useState, useContext, useCallback, useRef } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StyleSheet,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import _ from "underscore";
import hull from "hull.js";
import MapView, { Circle, Marker, Polygon } from "react-native-maps";

import constants from "../../../constants";
import GroupInfo from "../../components/Group/GroupInfo";
import Header from "../../components/Header";
import TypeModal from "../../components/Modals/TypeModal";
import GroupGraphTab from "../../components/Group/GroupGraphTab";
import ColBox from "../../components/ColBox";
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
  buoyData,
  groupInfo,
  setGroupInfo,
  onSwipe,
  onEndReached,
  refreshing,
  onRefresh,
  goToBuoyDetail,
  goToBuoyList,
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

  // concave hull algorithm...참고
  //https://www.npmjs.com/package/hull.js

  const latLog = [];
  const position = [];
  const hullPositions = [];
  if (buoyData.length > 0) {
    _.forEach(buoyData, (data) => {
      latLog.push({ latitude: data.latitude, longitude: data.longitude });
      position.push([data.latitude, data.longitude]);
    });
    _.forEach(hull(position, 50), (p) => {
      hullPositions.push({ latitude: p[0], longitude: p[1] });
    });
  }

  // let longitudes = buoyData?.map((bouy) => bouy.longitude); // y
  // let latitudes = buoyData?.map((bouy) => bouy.latitude); // x
  // const p = _.zip(latitudes, longitudes);
  // const h = hull(p, 50);
  // const totalP = [];
  // const points = [];

  // if (p.length > 0) {
  //   _.forEach(p, (p) => {
  //     totalP.push({ latitude: p[0], longitude: p[1] });
  //   });
  //   _.forEach(h, (p) => {
  //     points.push({ longitude: p[1], latitude: p[0] });
  //   });
  // }

  const RENDERITEM = ({ item, index }) => {
    return (
      <BouyCard
        key={item.model}
        index={index}
        onSwipe={onSwipe}
        goToBuoyDetail={goToBuoyDetail}
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
                  <Title>부표 정보</Title>
                </ColBox>
                <ColBox
                  style={{
                    padding: 3,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity onPress={() => goToBuoyList()}>
                    <EditText
                      style={{
                        fontWeight: "bold",
                        color: themeContext.idnColor,
                      }}
                    >
                      부표 추가
                    </EditText>
                  </TouchableOpacity>
                </ColBox>
              </View>
            </LineHeader>
            <CollapsibleFlatList
              headerHeight={headerHeight}
              scrollY={scrollY}
              data={buoyData}
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
          <GroupInfo bouyCount={buoyData.length} {...groupInfo} />
          {/* 그래프 관련도 무엇을 보여줄지 협의 필요.. */}
          <GroupGraphTab />
          {buoyData.length > 0 && (
            <View style={{ paddingHorizontal: 15, marginTop: 35 }}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: latLog[0].latitude,
                  longitude: latLog[0].longitude,
                  latitudeDelta: 0.00722,
                  longitudeDelta: 0.00221,
                }}
                mapType={"hybrid"}
                showsUserLocation={true}
              >
                <Polygon
                  coordinates={hullPositions}
                  fillColor={themeContext.greenColor + 80}
                  strokeColor="transparent" // fallback for when `strokeColors` is not supported by the map-provider
                />
                {latLog.map((p, index) => {
                  return (
                    <Circle
                      key={index}
                      center={p}
                      radius={1}
                      strokeWidth={1}
                      strokeColor={themeContext.orangeColor}
                      fillColor={themeContext.orangeColor}
                      zIndex={999}
                    />
                  );
                })}
              </MapView>
            </View>
          )}
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
