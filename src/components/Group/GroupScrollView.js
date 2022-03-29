import React from "react";
import { Animated } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  padding: ${(props) =>
    props.paddingSet ? "10px 10px 0px 10px" : "0px 0px 0px 0px"};
`;

export default ({ route, paddingSet = true, children }) => {
  const scrollPropsAndRef = useCollapsibleScene(route.name);

  return (
    <Container paddingSet={paddingSet}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        {...scrollPropsAndRef}
        bounces={false}
      >
        {children}
      </Animated.ScrollView>
    </Container>
  );
};
