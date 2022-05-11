import React, { useCallback, useContext } from "react";
import { View, Animated, TouchableOpacity, RefreshControl } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../../constants";
import BuoyListHeader from "../../../components/Buoy/BuoyListHeader";
import BuoyListCard from "../../../components/Buoy/BuoyListCard";

const CardWrapper = styled.View`
  height: 65px;
`;

export default DeallocatedBuoyListView = ({
  navigation,
  route,
  headerHeight,
  deallocated,
  refreshing,
  onRefresh,
  goToBuoyDetail,
}) => {
  const themeContext = useContext(ThemeContext);
  const scrollPropsAndRef = useCollapsibleScene(route.name);

  const RENDERITEM = ({ item }) => {
    return (
      <CardWrapper>
        <TouchableOpacity
          onPress={() => goToBuoyDetail(item)}
          activeOpacity={1}
        >
          <BuoyListCard {...item} />
        </TouchableOpacity>
      </CardWrapper>
    );
  };

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <View style={{ flex: 1, flexGrow: 1, paddingTop: 48 }}>
      <Animated.FlatList
        {...scrollPropsAndRef}
        data={deallocated}
        keyExtractor={keyExtractor}
        renderItem={RENDERITEM}
        ListHeaderComponent={<BuoyListHeader buoyCount={deallocated.length} />}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          backgroundColor: themeContext.mainColor,
          paddingTop: headerHeight,
          minHeight: constants.screenH,
        }}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        initialNumToRender={5}
        legacyImplementation={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={30}
          />
        }
        bounces={false}
      />
    </View>
  );
};
