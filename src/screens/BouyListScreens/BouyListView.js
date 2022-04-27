import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import Header from "../../components/Header";
import Container from "../../components/Container";

export default BouyListView = () => {
  return (
    <>
      <Header title="부이목록" />
      <Container>
        <View>
          <Text>부이목록</Text>
        </View>
      </Container>
    </>
  );
};
