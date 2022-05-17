import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Overlay } from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import styled from "styled-components/native";
import { useSharedValue } from "react-native-reanimated";

import constants from "../../../constants";
import BuoyDetailBottomSheet from "../../components/Buoy/BuoyDetailBottomSheet";

export default BouyDetailView = ({
  group_id,
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
  // console.log(data);
  // ref
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const y = useSharedValue(0);

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.00722,
          longitudeDelta: 0.00221,
        }}
        mapType={"hybrid"}
        showsUserLocation={true}
      >
        <Marker
          key={0}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={model}
        />
      </MapView>
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
