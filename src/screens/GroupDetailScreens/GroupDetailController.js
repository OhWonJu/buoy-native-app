import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import GroupDetailView from "./GroupDetailView";
import { MockData } from "../../../MockData";

export default GroupDetailController = ({ navigation, route }) => {
  const { name: id } = route;
  const data = MockData.find((data) => data.id === id);
  return <GroupDetailView navigation={navigation} route={route} data={data} />;
};
