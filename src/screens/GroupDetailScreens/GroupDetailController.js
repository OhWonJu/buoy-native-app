import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import GroupDetailView from "./GroupDetailView";

export default GroupDetailController = ({ navigation, route }) => {
  return <GroupDetailView navigation={navigation} route={route} />;
};
