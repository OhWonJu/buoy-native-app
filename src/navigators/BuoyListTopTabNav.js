import React from "react";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";

import Deallocated from "../screens/BuoyListScreens/DeallocatedBuoyListScreen/index";
import Allocated from "../screens/BuoyListScreens/AllocatedSBouyListcreen/index";
import TopHeader from "../components/TopHeader";
import TabHeader from "../components/TabHeader/TabHeader";

const Tabs = createMaterialCollapsibleTopTabNavigator();

export default ({ headerHeight, setHeaderHeight, goBack }) => {
  const TOP_HEADER = () => (
    <TopHeader
      setHeaderHeight={setHeaderHeight}
      leftOnPress={goBack}
      title={"부표관리"}
    />
  );

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
    <Tabs.Navigator
      collapsibleOptions={{
        headerHeight: headerHeight,
        renderHeader: TOP_HEADER,
        disableSnap: true,
      }}
      tabBar={({ navigation, state }) => (
        <TabHeader data={tabContext} navigation={navigation} state={state} />
      )}
    >
      <Tabs.Screen name="Deallocated">
        {({ navigation, route }) => (
          <Deallocated
            navigation={navigation}
            route={route}
            headerHeight={headerHeight}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name="Allocated">
        {({ navigation, route }) => (
          <Allocated
            navigation={navigation}
            route={route}
            headerHeight={headerHeight}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

// 탭 바 참고
// https://maruzzing.github.io/study/rnative/React-Native-%EC%BB%A4%EC%8A%A4%ED%85%80-%ED%83%AD-%EB%B0%94-%EB%84%A4%EB%B9%84%EC%BC%80%EC%9D%B4%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0/
