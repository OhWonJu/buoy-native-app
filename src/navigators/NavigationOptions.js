import React from "react";
import {
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";

export const verticallTransition = {
  gestureDirection: "vertical",
  //gestureResponseDistance: 135, // default
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  //HeaderStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
};

export const horizontalTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  //HeaderStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
