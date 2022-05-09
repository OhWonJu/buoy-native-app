import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Deallocated from "../screens/BuoyListScreens/DeallocatedBuoyListScreen/index";
import Allocated from "../screens/BuoyListScreens/AllocatedSBouyListcreen/index";
import TabHeader from "../components/TabHeader/TabHeader";

const Tab = createMaterialTopTabNavigator();

export default () => {
  const tabContext = [
    {
      key: 1,
      title: "미할당 부표",
      name: "Deallocated",
      ref: React.createRef(),
    },
    {
      key: 2,
      title: "할당 부표",
      name: "Allocated",
      ref: React.createRef(),
    },
  ];

  return (
    <Tab.Navigator
      tabBar={({ navigation }) => (
        <TabHeader data={tabContext} navigation={navigation} />
      )}
    >
      <Tab.Screen name="Deallocated" component={Deallocated} />
      <Tab.Screen name="Allocated" component={Allocated} />
    </Tab.Navigator>
  );
};

// 탭 바 참고
// https://maruzzing.github.io/study/rnative/React-Native-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%83%AD-%EB%B0%94-%EB%84%A4%EB%B9%84%EC%BC%80%EC%9D%B4%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0/
