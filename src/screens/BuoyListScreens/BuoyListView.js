import React, { useEffect } from "react";
import { View, Text, BackHandler } from "react-native";
import styled from "styled-components/native";

import constants from "../../../constants";
import BuoyListTopTabNav from "../../navigators/BuoyListTopTabNav";

const StatusBar = styled.View`
  background-color: ${(props) => props.theme.mainColor};
  height: ${constants.StatusBarHeight}px;
  z-index: 999;
`;

export default BuoyListView = ({ unassignedBuoys }) => {
  return (
    <>
      <StatusBar />
      <BuoyListTopTabNav />
    </>
  );
};
