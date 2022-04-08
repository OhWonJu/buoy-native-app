import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import { MockData } from "../../../MockData";

import GroupScrollView from "../../components/Group/GroupScrollView";
import GroupInfo from "../../components/Group/GroupInfo";
import GroupMap from "../../components/Group/GroupMap";
import Header from "../../components/Header";

export default GroupDetailView = ({ navigation, route, data }) => {
  return (
    <ScrollView>
      <Header title={data.name} />
      <GroupInfo data={data} />
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
