import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Dimensions,
  RefreshControl,
} from "react-native";

const window = Dimensions.get("window");

export default CollapsibleFlatList = ({
  headerHeight,
  scrollY,
  data,
  renderItem,
  onEndReachedThreshold,
  onEndReached,
  refreshing,
  onRefresh,
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
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={onEndReached}
      refreshControl={
        <RefreshControl
          // style={{ position: "absolute", zIndex: 999 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      removeClippedSubviews={true}
      initialNumToRender={5}
      legacyImplementation={true}
      bounces={false}
    />
  );
};
