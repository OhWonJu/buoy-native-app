import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import Header from "../../components/Header";
import Container from "../../components/Container";

export default BouyDetailView = ({ data }) => {
  return (
    <>
      <Container style={{ justifyContent: "center" }}>
        <View>
          <Text>부이상세</Text>
          <Text>{data.model}</Text>
        </View>
      </Container>
    </>
  );
};
