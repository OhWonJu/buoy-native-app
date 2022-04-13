import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MockData } from "../../../MockData";

import { shadows } from "../../../styles/GlobalStyles";
import constants from "../../../constants";
import GroupScrollView from "../../components/Group/GroupScrollView";
import GroupInfo from "../../components/Group/GroupInfo";
import GroupMap from "../../components/Group/GroupMap";
import Header from "../../components/Header";
import TypeModal from "../../components/Group/TypeModal";
import GroupGraphTab from "../../components/Group/GroupGraphTab";
import ColBox from "../../components/ColBox";
import SwipeWrapper from "../../components/SwipeWrapper/SwipeWrapper";
import LineBox from "../../components/Group/LineBox";

const RowBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LineHeader = styled.View`
  height: ${constants.StatusBarHeight + 50}px;
  padding: 0px 15px 10px 15px;
  background-color: ${(props) => props.theme.mainColor};
  flex-direction: row;
  align-items: flex-end;
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

  const [modalVisible, setModalVisible] = useState(false);
  const [typeModeIndex, setTypeModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||

  const [items, setItems] = useState(Lines);

  const typeModeText = [
    "일반 수하식",
    "연승 수하식",
    "땟목 수하식",
    "기타 수하식",
  ];

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
      <ScrollView
        style={{ backgroundColor: themeContext.mainColor }}
        bounces={false}
        stickyHeaderIndices={[4]}
        showsVerticalScrollIndicator={false}
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
        <LineHeader>
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
        <View
          style={{
            paddingHorizontal: 15,
            flex: 1,
          }}
        >
          {items.map((item, index) => (
            <SwipeWrapper
              key={item.id}
              onSwipe={() => {
                const newItems = [...items];
                newItems.splice(newItems.indexOf(item), 1);
                setItems(newItems);
              }}
            >
              <LineBox item={item} />
            </SwipeWrapper>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

// <View>
// <Text>{route.name}</Text>
// </View>
// <TouchableOpacity
// onPress={() =>
//   navigation.navigate("GroupManage", { groupName: route.name })
// }
// >
// <Text>구역관리</Text>
// </TouchableOpacity>
