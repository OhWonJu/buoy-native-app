import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import GroupDetailView from "./GroupDetailView";
import { _BUOY_DEALLOCATE, _GET, _REFETCH } from "../../../utils/Api";
import { _GET_PAGE, _GROUP_EDIT } from "./GroupDetailModel";
import { useQueryClient } from "react-query";

export default GroupDetailController = ({ navigation, route }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [groupInfo, setGroupInfo] = useState(route.params.groupInfo);

  const [buoyData, setBuoyData] = useState(null);
  // const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      _GET(
        `detail/buoy/list?group_id=${route.params?.id}`,
        setBuoyData,
        setLoading
      );
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _REFETCH(`detail/buoy/list?group_id=${route.params?.id}`, setBuoyData);
    setRefreshing(false);
  }, []);

  const onSwipe = async (model, index) => {
    const newData = [...buoyData];
    newData.splice(index, 1);
    setBuoyData(newData);
    setGroupInfo((prevState) => {
      return { ...prevState, smart_buoy: prevState.smart_buoy - 1 };
    });
    const result = await _BUOY_DEALLOCATE([model]);
  };

  const onEndReached = () => {
    // _GET_PAGE(
    //   `http://192.168.0.20:3124/detail/buoy/list?group=${route.params?.groupName}_limit=10&_page=` +
    //     page,
    //   bouyData,
    //   setBouyData,
    //   setPage
    // );
    null;
  };

  const goToBuoyDetail = (model) =>
    navigation.navigate("BuoyDetail", { model });
  const goToBuoyList = () => navigation.navigate("BuoyList");

  // // 그룹 정보 업데이트
  // const queryClient = useQueryClient();
  // // 최초 마운트될 때 업데이트 되는것을 막기 위해.
  // const firstRender = useRef(true);
  // useEffect(async () => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   } else {
  //     const newData = {
  //       group_id: groupInfo.group_id,
  //       group_name: groupInfo.group_name,
  //       group_system: typeModeIndex,
  //       plain_buoy: groupInfo.plain_buoy,
  //     };
  //     await _GROUP_EDIT(newData);
  //     queryClient.invalidateQueries(["groupData"]);
  //   }
  // }, [groupInfo, typeModeIndex]);

  const typeModeText = [
    "일반 수하식",
    "연승 수하식",
    "땟목 수하식",
    "기타 수하식",
  ];

  const [editModalVisible, setEditModalVisible] = useState(false);

  if (isLoading) {
    return null;
  }

  return (
    <GroupDetailView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      typeModeText={typeModeText}
      buoyData={buoyData}
      groupInfo={groupInfo}
      setGroupInfo={setGroupInfo}
      onSwipe={onSwipe}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      goToBuoyDetail={goToBuoyDetail}
      goToBuoyList={goToBuoyList}
      editModalVisible={editModalVisible}
      setEditModalVisible={setEditModalVisible}
    />
  );
};
