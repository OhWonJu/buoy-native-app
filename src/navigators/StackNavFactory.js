import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition, horizontalTransition } from "./NavigationOptions";

import Home from "../screens/HomeScreens/index";
// import Notification from "../screens/NotificationScreens/Notification";
// import Setting from "../screens/MyPageScreens/SettingScreens/index";

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
      {/* <Stacks.Screen
        name="Notification"
        component={Notification}
        options={{
          presentation: "card",
          ...verticallTransition,
          gestureDirection: "vertical-inverted",
        }}
      />
      <Stacks.Screen
        name="Setting"
        component={Setting}
        options={{
          presentation: "card",
          gestureEnabled: true,
          ...horizontalTransition,
        }}
      /> */}
    </Stacks.Navigator>
  );
};
