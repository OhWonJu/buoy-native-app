import React, { useEffect, useState, useCallback } from "react";

import GroupListView from "./GroupListView";
import {
  _BUOY_ALLOCATE,
  _GET,
  _GROUP_DELETE,
  _REFECTH,
} from "../../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupListData,
  setGroupListData,
} from "../../../store/groupListDataReducer";

export default GroupListController = ({ navigation, route }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  // const [groupData, setGroupData] = useState(null);
  const { groupData } = useSelector(getGroupListData);
  const dispatch = useDispatch();
  const setGroupData = (groupData) => dispatch(setGroupListData({ groupData }));
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    _GET("main/group", setGroupData, setLoading);
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _REFECTH("main/group", setGroupData);
    setRefreshing(false);
  }, []);

  const goBack = () => navigation.goBack();
  // const goToGroupDetail = (id, groupName, groupInfo,) => navigation.navigate(id, {id, groupName: })

  // 부표 할당 or 일반 뷰에 따른 press핸들링
  const onPressHandler = async (item) => {
    // append 상태 + 대상 buoy가 있는 경우에만...
    if (route.params?.isAppend && route.params.buoyList) {
      const result = await _BUOY_ALLOCATE(route.params.buoyList, item.group_id);
      goBack();
    } else {
      navigation.navigate("GroupDetail", {
        id: item.group_id,
        groupName: item.group_name,
        groupInfo: item,
      });
    }
  };
  //

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteGroup, setDeleteGroup] = useState({
    groupName: "",
    groupId: null,
  });
  const deleteHandler = async (id) => {
    const newData = [...groupData];
    const index = groupData.findIndex((group) => group.group_id === id);
    newData.splice(index, 1);
    setGroupData(newData);
    const result = await _GROUP_DELETE(id);
  };

  if (isLoading) {
    return null;
  }

  return (
    <GroupListView
      navigation={navigation}
      route={route}
      isAppend={route.params?.isAppend}
      onPressHandler={onPressHandler}
      selectedBuoy={route.params?.buoyList}
      groupData={groupData}
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      headerOnLayout={headerOnLayout}
      refreshing={refreshing}
      onRefresh={onRefresh}
      createModalVisible={createModalVisible}
      setCreateModalVisible={setCreateModalVisible}
      deleteModalVisible={deleteModalVisible}
      setDeleteModalVisible={setDeleteModalVisible}
      deleteGroup={deleteGroup}
      setDeleteGroup={setDeleteGroup}
      deleteHandler={deleteHandler}
      goBack={goBack}
      // goToGroupDetail={goToGroupDetail}
    />
  );
};
