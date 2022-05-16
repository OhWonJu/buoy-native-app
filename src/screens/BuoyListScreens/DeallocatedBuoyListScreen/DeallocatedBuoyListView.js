import React, { useCallback, useContext } from "react";
import { View, Animated, TouchableOpacity, RefreshControl } from "react-native";
import { useCollapsibleScene } from "react-native-collapsible-tab-view";
import styled, { ThemeContext } from "styled-components/native";

import constants from "../../../../constants";
import BuoyListHeader from "../../../components/Buoy/BuoyListHeader";
import BuoyListCard from "../../../components/Buoy/BuoyListCard";
import BuoyListBottomBar from "../../../components/Buoy/BuoyListBottomBar";
import BuoyListModal from "../../../components/Modals/BuoyListModal";

const CardWrapper = styled.View`
  height: 65px;
  width: 100%;
  background-color: ${(props) =>
    props.selected ? props.theme.lightUtilColor + 60 : props.theme.mainColor};
`;

export default DeallocatedBuoyListView = ({
  navigation,
  route,
  headerHeight,
  deallocated,
  refreshing,
  onRefresh,
  multiSelect,
  setMultiSelect,
  allSelect,
  setAllSelect,
  seletedItem,
  onPressHandler,
  goToGroupList,
}) => {
  const themeContext = useContext(ThemeContext);
  const scrollPropsAndRef = useCollapsibleScene(route.name);

  const RENDERITEM = ({ item }) => {
    return (
      <CardWrapper selected={item.selected}>
        <TouchableOpacity
          onPress={() => onPressHandler(item)}
          activeOpacity={1}
        >
          <BuoyListCard {...item} />
        </TouchableOpacity>
      </CardWrapper>
    );
  };

  const keyExtractor = useCallback((_, index) => index.toString(), []);

  return (
    <>
      <View style={{ flex: 1, flexGrow: 1, paddingTop: 48 }}>
        <Animated.FlatList
          {...scrollPropsAndRef}
          data={deallocated}
          keyExtractor={keyExtractor}
          renderItem={RENDERITEM}
          ListHeaderComponent={
            <BuoyListHeader
              buoyCount={deallocated.length}
              multiSelect={multiSelect}
              setMultiSelect={setMultiSelect}
              allSelect={allSelect}
              setAllSelect={setAllSelect}
            />
          }
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
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        {multiSelect && (
          <BuoyListBottomBar
            seletedItem={seletedItem}
            setMultiSelect={setMultiSelect}
            goToGroupList={goToGroupList}
          />
        )}
      </View>
    </>
  );
};
