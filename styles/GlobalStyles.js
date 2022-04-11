import React, { useContext } from "react";
import { StyleSheet, Platform } from "react-native";

export const shadows = StyleSheet.create({
  boxWrapper: {
    backgroundColor: "#FBFBFB",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
