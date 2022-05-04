import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import GroupDetailView from "./GroupDetailView";
import { _GET, _REFECTH } from "../../../utils/Api";
import { _GET_PAGE, _GROUP_EDIT } from "./GroupDetailModel";
import { setIsUpdate } from "../../../store/groupUpdateReducer";

export default GroupDetailController = ({ navigation, route }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [groupInfo, setGroupInfo] = useState(route.params.groupInfo);

  const [bouyData, setBouyData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    _GET(
      `detail/buoy/list?group_id=${route.params?.id}`,
      setBouyData,
      setLoading
    );
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _REFECTH(`detail/buoy/list?group_id=${route.params?.id}`, setBouyData);
    setRefreshing(false);
  }, []);

  const onSwipe = (item) => {
    const newData = [...bouyData];
    newData.splice(newData.indexOf(item), 1);
    setBouyData(newData);
    setGroupInfo((prevState) => {
      return { ...prevState, smart_buoy: prevState.smart_buoy - 1 };
    });
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

  const goToBouyDetail = (item) =>
    navigation.navigate("BouyDetail", { data: item });

  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const editName = (newName) => {
    setGroupInfo((prevState) => {
      return { ...prevState, group_name: newName };
    });
  };

  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [typeModeIndex, setTypeModeIndex] = useState(groupInfo.group_system); // 일반 || 연승 || 떗목 || 기타 ||
  const typeModeText = [
    "일반 수하식",
    "연승 수하식",
    "땟목 수하식",
    "기타 수하식",
  ];

  // 그룹 정보 업데이트
  const dispatch = useDispatch();
  // 최초 마운트될 때 업데이트 되는것을 막기 위해.
  const firstRender = useRef(true);
  useEffect(async () => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    } else {
      const newData = {
        group_id: groupInfo.group_id,
        group_name: groupInfo.group_name,
        group_system: typeModeIndex,
        plain_buoy: groupInfo.plain_buoy,
      };
      await _GROUP_EDIT(newData);
      dispatch(setIsUpdate({ isUpdate: true }));
    }
  }, [groupInfo, typeModeIndex]);

  if (isLoading) {
    return null;
  }

  return (
    <GroupDetailView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      editNameModalVisible={editNameModalVisible}
      setEditNameModalVisible={setEditNameModalVisible}
      editName={editName}
      typeModalVisible={typeModalVisible}
      setTypeModalVisible={setTypeModalVisible}
      typeModeIndex={typeModeIndex}
      setTypeModeIndex={setTypeModeIndex}
      typeModeText={typeModeText}
      bouyData={bouyData}
      groupInfo={groupInfo}
      setGroupInfo={setGroupInfo}
      onSwipe={onSwipe}
      onEndReached={onEndReached}
      refreshing={refreshing}
      onRefresh={onRefresh}
      goToBouyDetail={goToBouyDetail}
    />
  );
};
