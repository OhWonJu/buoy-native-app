import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition, horizontalTransition } from "./NavigationOptions";
import Home from "../screens/HomeScreens/index";
import GroupList from "../screens/GroupListScreens/index";
import GroupManage from "../screens/GroupManageScreens/index";

const Stacks = createStackNavigator();

export default ({ screenName }) => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screenName === "Home" ? (
        <Stacks.Screen name={"Home"} component={Home} />
      ) : null}
      {screenName === "GroupList" ? (
        <Stacks.Screen name={"GroupList"} component={GroupList} />
      ) : null}
      <Stacks.Screen
        name={"GroupManage"}
        component={GroupManage}
        options={{
          presentation: "card",
          headerShown: false,
          ...verticallTransition,
          gestureEnabled: false,
        }}
      />
    </Stacks.Navigator>
  );
};
