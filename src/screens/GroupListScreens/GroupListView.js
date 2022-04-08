import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import Header from "../../components/Header";
import Container from "../../components/Container";

export default GroupListView = () => {
  return (
    <>
      <Header title="구역목록" />
      <Container>
        <View>
          <Text>구역목록</Text>
        </View>
      </Container>
    </>
  );
};
