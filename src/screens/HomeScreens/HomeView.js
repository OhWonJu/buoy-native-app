import React from "react";
import { View, Text, StatusBar } from "react-native";
import styled from "styled-components/native";

import CommonHeader from "../../components/CommonHeader";
import Container from "../../components/Container";
import HomeTopTabNav from "../../navigators/HomeTopTabNav";

export default HomeView = ({ headerHeight, setHeaderHeight }) => {
  return (
    <>
      <StatusBar />
      <HomeTopTabNav
        headerHeight={headerHeight}
        setHeaderHeight={setHeaderHeight}
      />
    </>
  );
};
