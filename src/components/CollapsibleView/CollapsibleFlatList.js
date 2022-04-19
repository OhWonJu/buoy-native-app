import React, { useCallback } from "react";
import { View, StyleSheet, Text, Animated, Dimensions } from "react-native";
import constants from "../../../constants";

const window = Dimensions.get("window");

export default CollapsibleFlatList = ({
  headerHeight,
  scrollY,
  data,
  renderItem,
  contentContainerStyle,
}) => {
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingTop: headerHeight,
        minHeight: window.height + headerHeight,
        ...contentContainerStyle,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      bounces={false}
    />
  );
};
