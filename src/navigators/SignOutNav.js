import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition } from "./NavigationOptions";

import AuthHome from "../screens/AuthScreens/AuthHomeScreen/index";
import SignIn from "../screens/AuthScreens/SignInScreen/index";
import SignUp from "../screens/AuthScreens/SignUpScreen/index";

const SignOutNav = createStackNavigator();

export default () => {
  return (
    <SignOutNav.Navigator
      screenOptions={{
        presentation: "card",
        gestureEnabled: true,
        headerShown: false,
        // ...verticallTransition,
      }}
    >
      <SignOutNav.Screen name="AuthHome" component={AuthHome} />
      <SignOutNav.Screen name="SignIn" component={SignIn} />
      <SignOutNav.Screen name="SignUp" component={SignUp} />
    </SignOutNav.Navigator>
  );
};
