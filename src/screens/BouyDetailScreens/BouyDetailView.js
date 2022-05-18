import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../constants";
import BuoyDetailBottomSheet from "../../components/Buoy/BuoyDetailBottomSheet";
import BuoyDetailMapView from "../../components/Buoy/BuoyDetailMapView";

const LATITUDEDELTA = 0.01022;
const LONGITUDEDELTA = 0.01021;

export default BouyDetailView = ({
  group_name,
  height,
  latitude,
  longitude,
  line,
  model,
  model_idx,
  salinity,
  warn,
  warn_detail,
  water_temp,
  weight,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View style={StyleSheet.absoluteFill}>
      <BuoyDetailMapView
        latitude={latitude}
        longitude={longitude}
        model={model}
        latitudeDelta={LATITUDEDELTA}
        longitudeDelta={LONGITUDEDELTA}
      />
      <BuoyDetailBottomSheet
        group_name={group_name}
        height={height}
        line={line}
        model={model}
        model_idx={model_idx}
        salinity={salinity}
        warn={warn}
        warn_detail={warn_detail}
        water_temp={water_temp}
        weight={weight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

// https://github.com/eveningkid/react-native-google-maps/blob/main/App.jsx

// https://gorhom.github.io/react-native-bottom-sheet/custom-handle
