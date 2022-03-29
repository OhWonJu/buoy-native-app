import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { verticallTransition } from "./NavigationOptions";

import StackNavFactory from "./StackNavFactory";

const Drawer = createDrawerNavigator();

function DrawHome({ navigation, route }) {
  return <StackNavFactory screenName={"Home"} />;
}
function DrawGroupList({ navigation, route }) {
  return <StackNavFactory screenName={"GroupList"} />;
}

export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="DrawHome"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
    >
      <Drawer.Screen
        name="DrawHome"
        options={{ drawerLabel: ({ focus, color }) => <Text>대시보드</Text> }}
        component={DrawHome}
      />

      <Drawer.Screen
        name="DrawGroupList"
        options={{ drawerLabel: ({ focus, color }) => <Text>구역목록</Text> }}
        component={DrawGroupList}
      />
    </Drawer.Navigator>
  );
};
