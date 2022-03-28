import React, { useContext, useState } from "react";
import { Image, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeContext } from "styled-components/native";
import { Feather, Entypo } from "@expo/vector-icons";

import StackNavFactory from "./StackNavFactory";

const FONT_SIZE = 10;
const FONT_WEIGHT = "normal";

const Tabs = createBottomTabNavigator();

export default () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          display: tabBarVisible,
          height: 58,
          paddingBottom: 3,
          borderTopWidth: 0,
          backgroundColor: themeContext.bgColor,
          elevation: 2, // 그림자 제거 - 고도 옵션이라.....0이면 딱 달라붙어있는 너낌?
        },
        tabBarActiveTintColor: themeContext.yellowColor,
        tabBarInactiveTintColor: themeContext.blackColor + "55",
        gestureEnabled: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name={"TabHome"}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Feather name="home" size={focused ? 25 : 24} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                fontSize: FONT_SIZE,
                fontWeight: FONT_WEIGHT,
                color: color,
              }}
            >
              홈
            </Text>
          ),
        }}
      >
        {() => <StackNavFactory screenName="Home" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};
