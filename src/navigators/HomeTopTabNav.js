import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "styled-components/native";
import { createMaterialCollapsibleTopTabNavigator } from "react-native-collapsible-tab-view";

import { MockData } from "../../MockData";

import constants from "../../constants";
import Header from "../components/CommonHeader";
import GroupDetail from "../screens/GroupDetailScreens/index";

const FONT_SIZE = 17;
const FONT_WEIGHT = "bold";

const data = MockData;

const GROUP = ({ navigation, route }) => (
  <GroupDetail navigation={navigation} route={route} />
);

const Tabs = createMaterialCollapsibleTopTabNavigator();

export default ({ headerHeight, setHeaderHeight }) => {
  const themeContext = useContext(ThemeContext);
  const HEADER = () => {
    return <Header setHeaderHeight={setHeaderHeight} title="대시보드" />;
  };

  return (
    <Tabs.Navigator
      collapsibleOptions={{
        headerHeight: headerHeight,
        renderHeader: HEADER,
        disableSnap: true,
        swipeEnabled: false,
      }}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: themeContext.mainColor,
          borderBottomWidth: 0,
        },
        tabBarContentContainerStyle: {
          width: constants.width,
        },
        tabBarItemStyle: {
          paddingHorizontal: 15,
        },
        tabBarActiveTintColor: themeContext.idnColor,
        tabBarIndicatorContainerStyle: {
          //   width: constants.width,
          //   marginLeft: 5,
          borderColor: "rgba(0, 0, 0, 0)",
        },
        tabBarIndicatorStyle: {
          backgroundColor: themeContext.mainColor,
          borderBottomColor: themeContext.idnColor,
          //   borderBottomWidth: 2,
        },
        tabBarPressColor: "rgba(0, 0, 0, 0)",
      }}
      backBehavior="none"
    >
      {data.map((data, index) => (
        <Tabs.Screen
          key={index}
          name={data.id}
          component={GROUP}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: FONT_SIZE,
                  fontWeight: FONT_WEIGHT,
                  color: focused
                    ? themeContext.idnColor
                    : themeContext.subColor + "55",
                }}
              >
                {data.name}
              </Text>
            ),
          }}
        />
      ))}
    </Tabs.Navigator>
  );
};
