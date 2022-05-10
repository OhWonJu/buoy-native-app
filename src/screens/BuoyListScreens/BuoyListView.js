import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, BackHandler, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import constants from "../../../constants";
import CollapsibleHeader from "../../components/CollapsibleView/CollapsibleHeader";
import TopHeader from "../../components/TopHeader";
import BuoyListTopTabNav from "../../navigators/BuoyListTopTabNav";

const StatusBar = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  height: ${constants.StatusBarHeight}px;
  z-index: 999;
`;

export default BuoyListView = ({ headerHeight, setHeaderHeight, goBack }) => {
  return (
    <>
      <StatusBar />

      <BuoyListTopTabNav
        headerHeight={headerHeight}
        setHeaderHeight={setHeaderHeight}
        goBack={goBack}
      />
    </>
  );
};
