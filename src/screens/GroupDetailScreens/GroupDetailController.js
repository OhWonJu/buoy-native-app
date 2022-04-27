import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import GroupDetailView from "./GroupDetailView";
import { _GET } from "../../../commonRestAPIModel";

export default GroupDetailController = ({ navigation, route }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const [groupInfo, setGroupInfo] = useState(route.params.groupInfo);

  const [bouyData, setBouyData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    _GET(
      `http://192.168.0.20:3124/detail/buoy/list?group=${route.params?.groupName}`,
      setBouyData,
      setLoading
    );
  }, []);

  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [typeModeIndex, setTypeModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||
  const typeModeText = [
    "일반 수하식",
    "연승 수하식",
    "땟목 수하식",
    "기타 수하식",
  ];

  if (isLoading) {
    return null;
  }

  return (
    <GroupDetailView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      typeModalVisible={typeModalVisible}
      setTypeModalVisible={setTypeModalVisible}
      typeModeIndex={typeModeIndex}
      setTypeModeIndex={setTypeModeIndex}
      typeModeText={typeModeText}
      bouyData={bouyData}
      setBouyData={setBouyData}
      groupInfo={groupInfo}
      setGroupInfo={setGroupInfo}
    />
  );
};
