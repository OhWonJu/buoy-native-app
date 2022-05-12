import React, { useCallback, useEffect, useRef } from "react";
import { View, Text, BackHandler, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import constants from "../../../constants";
import BuoyListModal from "../../components/Modals/BuoyListModal";
import BuoyListTopTabNav from "../../navigators/BuoyListTopTabNav";

// const StatusBar = styled.View`
//   background-color: ${(props) => props.theme.mainColor};
//   height: ${constants.StatusBarHeight}px;
//   z-index: 9;
// `;

const Container = styled.View`
  flex: 1;
  padding-top: ${constants.StatusBarHeight}px;
  background-color: ${(props) => props.theme.mainColor};
`;
export default BuoyListView = ({
  headerHeight,
  setHeaderHeight,
  goBack,
  modalVisible,
  modalData,
}) => {
  return (
    <>
      {/* <StatusBar /> */}
      <Container>
        <BuoyListTopTabNav
          headerHeight={headerHeight}
          setHeaderHeight={setHeaderHeight}
          goBack={goBack}
        />
      </Container>
      {modalVisible && (
        <BuoyListModal modalVisible={modalVisible} modalData={modalData} />
      )}
    </>
  );
};
