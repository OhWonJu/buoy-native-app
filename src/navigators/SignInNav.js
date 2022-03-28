import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition } from "./NavigationOptions";
import MainBottomTabNav from "./MainBottomTabNav";

const Stacks = createStackNavigator();

export default () => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stacks.Screen
        name="MainBottomTabNav"
        component={MainBottomTabNav}
        // options={{
        //   presentation: "card",
        //   headerShown: false,
        //   ...verticallTransition,
        // }}
      />
    </Stacks.Navigator>
  );
};
