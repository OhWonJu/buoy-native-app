import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { MockData } from "../../../MockData";

import GroupScrollView from "../../components/Group/GroupScrollView";
import GroupNoti from "../../components/Group/GroupNoti";
import GroupMap from "../../components/Group/GroupMap";

export default GroupDetailView = ({ navigation, route }) => {
  const data = MockData.find((data) => data.id === route.name);
  return (
    <ScrollView>
      <GroupNoti data={data} />
      <GroupMap />
    </ScrollView>
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
