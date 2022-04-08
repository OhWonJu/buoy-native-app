import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { shadows } from "../../../styles/GlobalStyles";
import { Bouy, Wave, Weight, Wind } from "../../../styles/Icons";
import Container from "../Container";

export default GroupInfo = ({ data = null }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <Container style={{ backgroundColor: themeContext.idnColor }}></Container>
  );
};
