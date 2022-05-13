import React, { useEffect, useState, useCallback } from "react";

import GroupListView from "./GroupListView";
import { _BUOY_ALLOCATE, _GET, _REFECTH } from "../../../utils/Api";

export default GroupListController = ({ navigation, route }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerOnLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  }, []);

  const [groupData, setGroupData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    _GET("main/group", setGroupData, setLoading);
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _REFECTH("main/grpup", setGroupData);
    setRefreshing(false);
  }, []);

  const goBack = () => navigation.goBack();
  // const goToGroupDetail = (id, groupName, groupInfo,) => navigation.navigate(id, {id, groupName: })

  const onPressHandler = async (item) => {
    if (route.params?.isAppend && route.params.buoyList) {
      const result = await _BUOY_ALLOCATE(route.params.buoyList, item.group_id);
      goBack();
    } else {
      navigation.navigate(String(item.group_id), {
        id: item.group_id,
        groupName: item.group_name,
        groupInfo: item,
      });
    }
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
      goBack={goBack}
      // goToGroupDetail={goToGroupDetail}
    />
  );
};
