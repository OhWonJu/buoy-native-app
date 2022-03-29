import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

import DetailHeader from "../../components/DetailHeader";
import Container from "../../components/Container";

export default GroupManageView = ({ navigation, route }) => {
  return (
    <>
      <DetailHeader title={`${route.params?.groupName} 구역관리`} />
      <Container>
        <View>
          <Text>구역 관리</Text>
        </View>
      </Container>
    </>
  );
};
