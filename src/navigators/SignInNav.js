import React, { useState } from "react";
import { Text } from "react-native";
import Animated, {
  interpolateColors,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  createDrawerNavigator,
  useDrawerStatus,
} from "@react-navigation/drawer";

import StackNavFactory from "./StackNavFactory";
import DrawerBar from "../components/DrawerBar";

const Drawer = createDrawerNavigator();

function DrawHome({ navigation, route }) {
  return <StackNavFactory screenName={"Home"} />;
}

export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="DrawHome"
      drawerContent={(props) => {
        return <DrawerBar {...props} />;
      }}
      screenOptions={{
        headerShown: false,
        // swipeEnabled: false,
        drawerType: "slide",
        drawerStyle: {
          backgroundColor: {},
          width: "85%",
        },
      }}
    >
      <Drawer.Screen
        name="DrawHome"
        options={{ drawerLabel: ({ focus, color }) => <Text>대시보드</Text> }}
        component={DrawHome}
      />

      {/* <Drawer.Screen
        name="DrawGroupList"
        options={{ drawerLabel: ({ focus, color }) => <Text>구역목록</Text> }}
        component={DrawGroupList}
      /> */}
    </Drawer.Navigator>
  );
};
