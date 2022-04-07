import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition, horizontalTransition } from "./NavigationOptions";
import Home from "../screens/HomeScreens/index";
import GroupList from "../screens/GroupListScreens/index";
import GroupManage from "../screens/GroupManageScreens/index";
import GroupDetail from "../screens/GroupDetailScreens/index";

import { MockData } from "../../MockData";

const data = MockData;

const GROUP = ({ navigation, route }) => (
  <GroupDetail navigation={navigation} route={route} />
);

const Stacks = createStackNavigator();

export default ({ navigation, route, screenName }) => {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* {screenName === "Home" ? (
        <Stacks.Screen name={"Home"} component={Home} />
      ) : null} */}
      {/* {screenName === "GroupList" ? (
        <Stacks.Screen name={"GroupList"} component={GroupList} />
      ) : null} */}

      <Stacks.Screen name={"Home"} component={Home} />
      <Stacks.Screen name={"GroupList"} component={GroupList} />
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
      {data.map((data, index) => (
        <Stacks.Screen key={index} name={data.id} component={GROUP} />
      ))}
    </Stacks.Navigator>
  );
};
