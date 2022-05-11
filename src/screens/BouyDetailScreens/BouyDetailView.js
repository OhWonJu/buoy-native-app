import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

import Header from "../../components/Header";
import Container from "../../components/Container";
import constants from "../../../constants";

export default BouyDetailView = ({ model, latitude, longitude }) => {
  // console.log(data);
  return (
    <>
      <Container style={{ justifyContent: "center" }}>
        <View>
          <Text>부이상세</Text>
          <Text>{model}</Text>
          <MapView
            style={styles.map}
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
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: constants.screenW - 30,
  },
});
