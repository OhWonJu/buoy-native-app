import React, { useContext, useRef } from "react";
import {
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import constants from "../../../constants";
import { shadows } from "../../../styles/GlobalStyles";
import Button from "../../components/Button";
import CollapsibleFlatList from "../../components/CollapsibleView/CollapsibleFlatList";
import CollapsibleHeader from "../../components/CollapsibleView/CollapsibleHeader";
import GroupCard from "../../components/Group/GroupCard";
import RowBox from "../../components/RowBox";
import TopHeader from "../../components/TopHeader";
import GroupDeleteModal from "../../components/Modals/GroupDeleteModal";
import GroupCreateModal from "../../components/Modals/GroupCreateModal";

const LINEHEADER_HEIGHT = 80 + constants.StatusBarHeight;

const FlatListHeader = styled(Animated.View)`
  height: ${LINEHEADER_HEIGHT}px;
  width: 100%;
  justify-content: space-between;
  /* align-items: center; */
  padding: 0px 15px 15px 15px;
  padding-top: ${constants.StatusBarHeight}px;
  background-color: ${(props) => props.theme.mainColor};
  z-index: 1;
`;
const Toolbar = styled.View`
  flex-direction: row;
`;
const LeftText = styled.Text`
  font-weight: bold;
  font-size: 13px;
  color: ${(props) => props.theme.subColor};
`;

const EditText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.mainColor};
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${(props) => props.theme.subColor};
`;

const HeaderWrapper = styled.View`
  padding-top: ${constants.StatusBarHeight}px;
  justify-content: center;
  width: ${constants.screenW}px;
`;

export default GroupListView = ({
  navigation,
  route,
  isAppend = false,
  onPressHandler,
  selectedBuoy = 0,
  groupData,
  headerHeight,
  setHeaderHeight,
  headerOnLayout,
  refreshing,
  onRefresh,
  createModalVisible,
  setCreateModalVisible,
  deleteModalVisible,
  setDeleteModalVisible,
  deleteGroup,
  setDeleteGroup,
  deleteHandler,
  goBack,
}) => {
  const themeContext = useContext(ThemeContext);

  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight],
    extrapolate: "clamp",
  });
  const tabBarTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolateRight: "clamp",
  });

  const RENDERITEM = ({ item, index }) => {
    return (
      <GroupCard
        key={item.group_id}
        index={index}
        onPressHandler={onPressHandler}
        isAppend={isAppend}
        setModalVisible={setDeleteModalVisible}
        setDeleteGroup={setDeleteGroup}
        item={item}
      />
    );
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: themeContext.mainColor }}>
        {headerHeight > 0 && (
          <>
            <FlatListHeader
              pointerEvents="box-none"
              style={{ transform: [{ translateY: tabBarTranslateY }] }}
            >
              <Toolbar>
                <RowBox>
                  {isAppend ? (
                    <>
                      <LeftText style={{ fontWeight: "bold", paddingRight: 3 }}>
                        선택된 부표
                      </LeftText>
                      <LeftText style={{ color: themeContext.idnColor }}>
                        총 {selectedBuoy.length}개
                      </LeftText>
                    </>
                  ) : (
                    <>
                      <LeftText style={{ fontWeight: "bold", paddingRight: 3 }}>
                        전체 구역
                      </LeftText>
                      <LeftText style={{ color: themeContext.idnColor }}>
                        {groupData.length}
                      </LeftText>
                    </>
                  )}
                </RowBox>
                <RowBox>
                  <TouchableOpacity></TouchableOpacity>
                </RowBox>
              </Toolbar>
              <View style={{ alignItems: "center" }}>
                <Button
                  icon={
                    <Feather
                      name="plus"
                      size={18}
                      color={themeContext.mainColor}
                    />
                  }
                  text={"새 구역 만들기"}
                  txColor={themeContext.mainColor}
                  txSize={14}
                  width={"100%"}
                  height={"40px"}
                  onPress={() => setCreateModalVisible(true)}
                />
              </View>
            </FlatListHeader>
            <CollapsibleFlatList
              headerHeight={headerHeight}
              scrollY={scrollY}
              data={groupData}
              renderItem={RENDERITEM}
              refreshing={refreshing}
              onRefresh={onRefresh}
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingBottom: LINEHEADER_HEIGHT,
              }}
            />
          </>
        )}

        <CollapsibleHeader
          onLayout={headerOnLayout}
          headerTranslateY={headerTranslateY}
        >
          <HeaderWrapper>
            <TopHeader
              title={isAppend ? "구역 선택" : "구역 관리"}
              leftOnPress={goBack}
            />
          </HeaderWrapper>
        </CollapsibleHeader>
      </SafeAreaView>
      {createModalVisible && (
        <GroupCreateModal
          modalVisible={createModalVisible}
          setModalVisible={setCreateModalVisible}
          onRefresh={onRefresh}
        />
      )}
      {deleteModalVisible && (
        <GroupDeleteModal
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          deleteGroup={deleteGroup}
          setDeleteGroup={setDeleteGroup}
          confirm={deleteHandler}
        />
      )}
    </>
  );
};
