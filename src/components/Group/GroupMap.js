import React from "react";
import { WebView } from "react-native-webview";
import styled from "styled-components/native";

import constants from "../../../constants";

const Container = styled.View`
  padding: 10px;
  /* margin-bottom: 15px; */
  background-color: ${(props) => props.theme.mainColor};
  height: 4000px;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
`;

export default GroupMap = ({ data = null }) => {
  return (
    // <Container>
    <WebView style={{ flex: 1 }} source={{ uri: "https://expo.dev" }} />
    // </Container>
  );
};
