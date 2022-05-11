import React, { useCallback } from "react";
import { Animated, RefreshControl } from "react-native";
import constants from "../../../constants";

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
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingTop: headerHeight,
        minHeight: constants.windowH + headerHeight,
        ...contentContainerStyle,
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={20}
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
