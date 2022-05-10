import React, { useCallback, useRef } from "react";
import { Text, StyleSheet, FlatList, Animated } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";

import constants from "../../../../constants";
import BuoyListHeader from "../../../components/Buoy/BuoyListHeader";
import CollapsibleFlatList from "../../../components/CollapsibleView/CollapsibleFlatList";
import Container from "../../../components/Container";

export default DeallocatedBuoyListView = ({
  navigation,
  route,
  headerHeight,
  deallocated,
}) => {
  const scrollPropsAndRef = useCollapsibleScene(route.name);

  const scrollY = useRef(new Animated.Value(0)).current;

  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight + 48],
    outputRange: [headerHeight + 48, 0],
    extrapolateRight: "clamp",
  });

  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const d = new Array(20).fill(null);

  const RENDERITEM = ({ item, index }) => {
    return (
      <Text key={index} style={{ padding: 20, color: "red" }}>
        {index}
      </Text>
    );
  };

  return (
    <>
      {headerHeight > 0 && (
        <>
          <Animated.View
            pointerEvents="box-none"
            style={{ transform: [{ translateY: tabBarTranslateY }] }}
          >
            <BuoyListHeader />
          </Animated.View>
          <CollapsibleFlatList
            headerHeight={headerHeight}
            scrollY={scrollY}
            data={d}
            renderItem={RENDERITEM}
            // onEndReachedThreshold={0.1}
            // onEndReached={onEndReached}
            // refreshing={refreshing}
            // onRefresh={onRefresh}
          />
        </>
      )}
    </>
  );
};
