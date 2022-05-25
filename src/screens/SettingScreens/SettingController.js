import React from "react";
import SettingView from "./SettingView";

export default SettingController = ({ navigation, route }) => {
  const goBack = () => navigation.goBack();

  return <SettingView navigation={navigation} route={route} goBack={goBack} />;
};
