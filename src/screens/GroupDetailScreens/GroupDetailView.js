import React, { useState, useContext, useCallback, useRef } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  FlatList,
  Text,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../constants";
import GroupInfo from "../../components/Group/GroupInfo";
import GroupMap from "../../components/Group/GroupMap";
import Header from "../../components/Header";
import TypeModal from "../../components/Group/TypeModal";
import GroupGraphTab from "../../components/Group/GroupGraphTab";
import ColBox from "../../components/ColBox";
import SwipeWrapper from "../../components/SwipeWrapper/SwipeWrapper";
import LineBox from "../../components/Group/LineBox";
import CollapsibleHeader from "../../components/CollapsibleView/CollapsibleHeader";
import CollapsibleFlatList from "../../components/CollapsibleView/CollapsibleFlatList";

const RowBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LineHeader = styled(Animated.View)`
  height: 60px;
  padding: 0px 15px 10px 15px;
  background-color: ${(props) => props.theme.mainColor};
  flex-direction: row;
  align-items: flex-end;
  z-index: 1;
  /* border-bottom-color: ${(props) => props.theme.lightUtilColor};
  border-bottom-width: 1px; */
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

const Lines = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
  { id: 6, name: 6 },
  { id: 7, name: 7 },
  { id: 8, name: 8 },
  { id: 9, name: 9 },
  { id: 10, name: 10 },
  { id: 11, name: 11 },
  { id: 12, name: 12 },
  { id: 13, name: 13 },
  { id: 14, name: 14 },
];

export default GroupDetailView = ({ navigation, route, data }) => {
  const themeContext = useContext(ThemeContext);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModeIndex, setTypeModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||

  const [items, setItems] = useState(Lines);

  const typeModeText = [
    "일반 수하식",
    "연승 수하식",
    "땟목 수하식",
    "기타 수하식",
  ];

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
        key={item.id}
        onSwipe={() => {
          const newItems = [...items];
          newItems.splice(newItems.indexOf(item), 1);
          setItems(newItems);
        }}
        HEIGHT={70}
      >
        <LineBox item={item} />
      </SwipeWrapper>
    );
  };

  return (
    <>
      {
        <TypeModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          typeModeIndex={typeModeIndex}
          setTypeModeIndex={setTypeModeIndex}
          typeModeText={typeModeText}
        />
      }
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
                  <Title>라인 정보</Title>
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
                      라인 추가
                    </EditText>
                  </TouchableOpacity>
                </ColBox>
              </View>
            </LineHeader>
            <CollapsibleFlatList
              headerHeight={headerHeight}
              scrollY={scrollY}
              data={items}
              renderItem={RENDERITEM}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            />
          </>
        )}

        {/* pointerEvents="box-none"가 상속이 안되는 이슈.... */}
        <CollapsibleHeader
          onLayout={headerOnLayout}
          headerTranslateY={headerTranslateY}
        >
          <Header
            title={data.name}
            rightChildren={
              <RowBox>
                <EditText style={{ fontSize: 12, paddingRight: 10 }}>
                  {data.location}
                </EditText>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <EditText style={{ fontWeight: "bold" }}>
                    {typeModeText[typeModeIndex]}
                  </EditText>
                </TouchableOpacity>
              </RowBox>
            }
          />
          <GroupInfo data={data} />
          <GroupGraphTab />
          <GroupMap />
        </CollapsibleHeader>
      </SafeAreaView>
    </>
  );
};
