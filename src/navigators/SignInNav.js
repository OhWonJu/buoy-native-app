import React, { useState } from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import StackNavFactory from "./StackNavFactory";
import DrawerBar from "../components/DrawerBar";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default ({ groupData }) => {
  return (
    <Drawer.Navigator
      initialRouteName="DrawHome"
      drawerContent={(props) => {
        return <DrawerBar {...props} groupData={groupData} />;
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
        name={"DrawHome"}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          if (
            routeName == "GroupList" ||
            routeName == "BouyDetail" ||
            routeName == "BuoyList"
          ) {
            return { swipeEnabled: false };
          }
        }}
      >
        {() => <StackNavFactory groupData={groupData} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

// Drawer에서 nesting Stack할 때 탭처럼 동일 nesting Factory를 쓰면 꼬이는 것 같다..
// 왜 인지는모르겠지만...각 Drawer Screen 마다 다른 nesting stack을 쓰는게 나은듯 하다..
// stack Factory의 screenName Props가 제대로 갱신 안됨
// 아마 각 Drawer를 한번씩 랜더링하면 그대로 남아있어서 그런듯...
