import React, { useEffect, useState, useCallback } from "react";

import GroupListView from "./GroupListView";
import {
  _BUOY_ALLOCATE,
  _GET,
  _GROUP_DELETE,
  _REFECTH,
} from "../../../utils/Api";
import { useMutation, useQueryClient } from "react-query";
import { useFocusEffect } from "@react-navigation/native";

export default GroupListController = ({ navigation, route }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [groupData, setGroupData] = useState(null);
  useFocusEffect(
    useCallback(() => {
      // hooks 안에서 비동기 처리를 하기 위해서는
      // 부수 효과 함수를 훅스안에서 호출하는 형식으로 해야햠...
      async function refetch() {
        await queryClient.refetchQueries(["groupData"]);
        setGroupData(queryClient.getQueryData(["groupData"]));
      }
      refetch();
      setLoading(false);
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["groupData"]);
    setGroupData(queryClient.getQueryData(["groupData"]));
    setRefreshing(false);
  }, []);

  const goBack = () => navigation.goBack();

  // 부표 할당 or 일반 뷰에 따른 press핸들링
  const onPressHandler = async (item) => {
    // append 상태 + 대상 buoy가 있는 경우에만...
    if (route.params?.isAppend && route.params.buoyList) {
      const result = await _BUOY_ALLOCATE(route.params.buoyList, item.group_id);
      // dispatch(setIsUpdate({ isUpdate: true }));
      queryClient.invalidateQueries(["groupData"], {
        refetchInactive: true,
      });
      goBack();
    } else {
      navigation.navigate(String(item.group_id), {
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
  const { mutate, isLoading } = useMutation(_GROUP_DELETE, {
    onSuccess: () => {
      // mutation 성공시 기존 데이터를 오래된 데이터로 강제로 간주
      queryClient.invalidateQueries(["groupData"], {
        refetchInactive: true,
      });
      queryClient.invalidateQueries(["mainData", "groupTotal"], {
        refetchInactive: true,
      });
      onRefresh();
    },
  });
  const deleteHandler = async (id) => {
    const newData = [...groupData];
    const index = groupData.findIndex((group) => group.group_id === id);
    newData.splice(index, 1);
    setGroupData(newData);
    mutate(id);
  };

  if (loading) {
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
