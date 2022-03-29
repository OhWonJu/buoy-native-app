import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import CommonHeader from "../../components/CommonHeader";
import Container from "../../components/Container";

export default GroupListView = () => {
  return (
    <>
      <CommonHeader title="구역목록" />
      <Container>
        <View>
          <Text>구역목록</Text>
        </View>
      </Container>
    </>
  );
};
