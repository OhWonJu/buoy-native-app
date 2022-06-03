import React, { useState } from "react";
import TimePickerModal from "../../components/Modals/TimePickerModal";
import SettingView from "./SettingView";

export default SettingController = ({ navigation, route }) => {
  const goBack = () => navigation.goBack();

  const [alertActivate, setAlertActivate] = useState(1);
  const [cycleHour, setCylceHour] = useState(1);
  const [cycleModalVisible, setCycleModalVisible] = useState(false);

  const [interferenceTimeActivate, setInterferenceTimeActivate] = useState(0);
  const [interferenceStartTime, setInterferenceStartTime] = useState(
    new Date()
  );
  const [interferenceStopTime, setInterferenceStopTime] = useState(new Date());
  const [isStart, setIsStart] = useState(true);
  const [interfModalVisible, setInterfModalVisible] = useState(false);

  return (
    <SettingView
      navigation={navigation}
      route={route}
      goBack={goBack}
      alertActivate={alertActivate}
      setAlertActivate={setAlertActivate}
      cycleHour={cycleHour}
      setCylceHour={setCylceHour}
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
    />
  );
};
