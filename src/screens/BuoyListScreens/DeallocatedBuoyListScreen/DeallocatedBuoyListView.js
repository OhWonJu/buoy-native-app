import React, { useCallback, useContext, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { ThemeContext } from "styled-components";

import constants from "../../../../constants";
import BuoyListHeader from "../../../components/Buoy/BuoyListHeader";

export default DeallocatedBuoyListView = ({
  navigation,
  route,
  headerHeight,
  deallocated,
}) => {
  const themeContext = useContext(ThemeContext);
  const scrollPropsAndRef = useCollapsibleScene(route.name);

  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const d = new Array(20).fill(null);

  const RENDERITEM = ({ item, index }) => {
    return (
      <Text key={index} style={{ padding: 20, color: "red" }}>
        {index}
      </Text>
    );
  };

  //https://stackoverflow.com/questions/44874469/react-native-style-a-sticky-header-when-it-sticks 헤더 붙을 때 마진주면??
  return (
    <>
      <View style={{ flex: 1, paddingTop: 48 }}>
        <Animated.FlatList
          {...scrollPropsAndRef}
          data={d}
          keyExtractor={keyExtractor}
          renderItem={RENDERITEM}
          ListHeaderComponent={<BuoyListHeader />}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{
            paddingTop: headerHeight,
            minHeight: constants.screenH + 48,
          }}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          initialNumToRender={5}
          legacyImplementation={true}
          bounces={false}
        />
      </View>
    </>
  );
};
