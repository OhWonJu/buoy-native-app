import React, { useState } from "react";
import TimePickerModal from "../../components/Modals/TimePickerModal";
import SettingView from "./SettingView";

export default SettingController = ({ navigation, route }) => {
  const goBack = () => navigation.goBack();

  const [alertActivate, setAlertActivate] = useState(false);
  const [cycleModalVisible, setCycleModalVisible] = useState(false);

  const [interferenceTimeActivate, setInterferenceTimeActivate] =
    useState(false);
  const [interferenceStartTime, setInterferenceStartTime] = useState(
    new Date()
  );
  const [interferenceStopTime, setInterferenceStopTime] = useState(new Date());
  const [isStart, setIsStart] = useState(true);
  const [interfModalVisible, setInterfModalVisible] = useState(false);

  const toggle = (value, setter) => {
    setter(!value);
  };

  return (
    <SettingView
      navigation={navigation}
      route={route}
      goBack={goBack}
      alertActivate={alertActivate}
      setAlertActivate={setAlertActivate}
      cycleModalVisible={cycleModalVisible}
      setCycleModalVisible={setCycleModalVisible}
      interferenceTimeActivate={interferenceTimeActivate}
      setInterferenceTimeActivate={setInterferenceTimeActivate}
      interferenceStartTime={interferenceStartTime}
      setInterferenceStartTime={setInterferenceStartTime}
      interferenceStopTime={interferenceStopTime}
      setInterferenceStopTime={setInterferenceStopTime}
      isStart={isStart}
      setIsStart={setIsStart}
      interfModalVisible={interfModalVisible}
      setInterfModalVisible={setInterfModalVisible}
      toggle={toggle}
    />
  );
};
