import React, { useState, useContext } from "react";

import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { MockData } from "../../../MockData";

import GroupScrollView from "../../components/Group/GroupScrollView";
import GroupInfo from "../../components/Group/GroupInfo";
import GroupMap from "../../components/Group/GroupMap";
import Header from "../../components/Header";
import TypeModal from "../../components/Group/TypeModal";
import GroupGraphTab from "../../components/Group/GroupGraphTab";

const RowBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const EditText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.mainColor};
`;

export default GroupDetailView = ({ navigation, route, data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModeIndex, setTypeModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||

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

      <ScrollView>
        <Header
          title={data.name}
          rightChildren={
            <RowBox>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <EditText style={{ fontWeight: "bold" }}>
                  {typeModeText[typeModeIndex]}
                </EditText>
              </TouchableOpacity>
              <EditText style={{ fontSize: 12, paddingLeft: 10 }}>
                {data.location}
              </EditText>
            </RowBox>
          }
        />
        <GroupInfo data={data} />
        <GroupGraphTab />
        <GroupMap />
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
