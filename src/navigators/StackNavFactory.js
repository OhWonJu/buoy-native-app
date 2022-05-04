import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition, horizontalTransition } from "./NavigationOptions";
import Home from "../screens/HomeScreens/index";
import BouyList from "../screens/BouyListScreens/index";
import GroupDetail from "../screens/GroupDetailScreens/index";
import BouyDetail from "../screens/BouyDetailScreens/index";

const Stacks = createStackNavigator();

export default ({ navigation, route, screenName, groupData }) => {
  if (groupData) {
    return (
      <Stacks.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stacks.Screen name={"Home"} component={Home} />
        {groupData.map((data, index) => (
          <Stacks.Screen key={index} name={String(data.group_id)}>
            {({ navigation, route }) => (
              <GroupDetail navigation={navigation} route={route} />
            )}
          </Stacks.Screen>
        ))}
        <Stacks.Screen name={"BouyList"} component={BouyList} />
        <Stacks.Screen name={"BouyDetail"} component={BouyDetail} />
      </Stacks.Navigator>
    );
  } else {
    return null;
  }
};
