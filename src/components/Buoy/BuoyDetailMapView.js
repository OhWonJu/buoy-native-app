import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import NaverMapView, { Marker, MapType, Circle } from "react-native-nmap";
import styled, { ThemeContext } from "styled-components/native";
import * as Location from "expo-location";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import constants from "../../../constants";
import { templateSettings } from "underscore";

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

export default BouyDetailView = ({ latitude, longitude, model }) => {
  const themeContext = useContext(ThemeContext);

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
        timeInterval: 20000,
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
    return () => {
      stopForegroundUpdate();
    };
  }, []);

  const goToUserLocation = async () => {
    // setLocationTrackingMode 설정 기능도 해야할둣
    if (position) {
      const { latitude, longitude } = position;
      mapRef.current.animateToCoordinate({
        latitude,
        longitude,
      });
    }
  };
  const goToMarker = () =>
    mapRef.current.animateToCoordinate({
      latitude: latitude,
      longitude: longitude,
    });

  return (
    <>
      <NaverMapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        center={{
          latitude: latitude,
          longitude: longitude,
          zoom: 14,
        }}
        mapType={MapType.Hybrid}
        // mapPadding={{ top: constants.StatusBarHeight }}
      >
        <Marker
          key={0}
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          caption={{ text: model, requestedWidth: 100 }}
        />
        {position && (
          <Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            width={40}
            height={40}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: themeContext.blueColor + 50,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                  height: "50%",
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    height: "80%",
                    backgroundColor: themeContext.blueColor,
                    borderRadius: 20,
                  }}
                />
              </View>
            </View>
          </Marker>
        )}
      </NaverMapView>
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
    </>
  );
};
