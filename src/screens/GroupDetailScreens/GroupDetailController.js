import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import GroupDetailView from "./GroupDetailView";
import { _GET } from "../../../commonRestAPIModel";

export default GroupDetailController = ({
  navigation,
  route,
  id,
  groupName,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModeIndex, setTypeModeIndex] = useState(0); // recent || createFirst || editFirst || popularity ||

  const typeModeText = [
    "일반 수하식",
    "연승 수하식",
    "땟목 수하식",
    "기타 수하식",
  ];

  useEffect(() => {
    _GET(
      `http://192.168.0.20:3124/detail/group?group=${groupName}`,
      setData,
      setLoading
    );
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <GroupDetailView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      typeModeIndex={typeModeIndex}
      setTypeModeIndex={setTypeModeIndex}
      typeModeText={typeModeText}
      data={data}
      setData={setData}
      groupInfo={route.params?.groupInfo}
    />
  );
};
