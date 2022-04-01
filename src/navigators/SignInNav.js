import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import StackNavFactory from "./StackNavFactory";
import DrawerBar from "../components/DrawerBar";

function DrawHome({ navigation, route }) {
  return <StackNavFactory screenName={"Home"} />;
}
function DrawGroupList({ navigation, route }) {
  return <StackNavFactory screenName={"GroupList"} />;
}

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="DrawHome"
      drawerContent={(props) => {
        return <DrawerBar {...props} />;
      }}
      defaultStatus="closed"
      screenOptions={{
        headerShown: false,
        // swipeEnabled: false,
        drawerType: "slide",
        drawerStyle: {
          width: "85%",
        },
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
