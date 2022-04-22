import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { verticallTransition, horizontalTransition } from "./NavigationOptions";
import Home from "../screens/HomeScreens/index";
import GroupList from "../screens/GroupListScreens/index";
import GroupManage from "../screens/GroupManageScreens/index";
import GroupDetail from "../screens/GroupDetailScreens/index";

const GROUP_DETAIL = ({ navigation, route, id }) => (
  <GroupDetail navigation={navigation} route={route} id={id} />
);

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
        {groupData.map((data, index) => (
          <Stacks.Screen key={index} name={String(data.group_id)}>
            {({ navigation, route }) => (
              <GroupDetail
                navigation={navigation}
                route={route}
                id={data.group_id}
                groupName={data.group_name}
              />
            )}
          </Stacks.Screen>
        ))}
      </Stacks.Navigator>
    );
  } else {
    return null;
  }
};
