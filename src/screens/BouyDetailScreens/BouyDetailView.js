import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled, { ThemeContext } from "styled-components/native";
import { useSharedValue } from "react-native-reanimated";
import * as Location from "expo-location";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import constants from "../../../constants";
import BuoyDetailBottomSheet from "../../components/Buoy/BuoyDetailBottomSheet";

const MarkerBtn = styled.TouchableOpacity`
  position: absolute;
  width: 40px;
  height: 40px;
  left: 3%;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

let foregroundSubscription = null;

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
  const y = useSharedValue(0);

  const mapRef = useRef(null);

  const [position, setPosition] = useState(null);
  // https://chafikgharbi.com/expo-location-tracking/  location-tracking
  const startForegroundUpdate = async () => {
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
    }
    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();
    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        setPosition(location.coords);
      }
    );
  };
  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();
    setPosition(null);
  };

  useEffect(() => {
    startForegroundUpdate();
    return stopForegroundUpdate();
  }, []);

  const goToUserLocation = async () => {
    if (position) {
      const { latitude, longitude } = position;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: LATITUDEDELTA,
        longitudeDelta: LONGITUDEDELTA,
      });
    }
  };
  const goToMarker = () =>
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: LATITUDEDELTA,
      longitudeDelta: LONGITUDEDELTA,
    });

  return (
    <View style={StyleSheet.absoluteFill}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDEDELTA,
          longitudeDelta: LONGITUDEDELTA,
        }}
        mapType={"hybrid"}
        // showsUserLocation={true}
        // showsMyLocationButton={false}
        mapPadding={{ top: constants.StatusBarHeight }}
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
      <MarkerBtn
        style={{
          bottom: "12%",
          marginBottom: 50,
        }}
        onPress={() => goToMarker()}
      >
        <Entypo name="location-pin" size={28} color={themeContext.utilColor} />
      </MarkerBtn>
      <MarkerBtn
        style={{
          bottom: "12%",
        }}
        onPress={() => goToUserLocation()}
      >
        <MaterialCommunityIcons
          name="target"
          size={26}
          color={themeContext.utilColor}
        />
      </MarkerBtn>
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
