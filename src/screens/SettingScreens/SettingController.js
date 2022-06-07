import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignOut } from "../../../auth";
import { setAlert, setInterfernce } from "../../../localStore";
import {
  getAlertInterval,
  setAlertInterval,
} from "../../../store/alertIntervalReducer";
import { setAuth } from "../../../store/authReducer";

import {
  getInterferenceTime,
  setInterferenceTime,
} from "../../../store/interferenceTimeReducer";
import SettingView from "./SettingView";

export default SettingController = ({ navigation, route }) => {
  const goBack = () => navigation.goBack();
  const dispatch = useDispatch();

  const { activate: alertActivate, interval } = useSelector(getAlertInterval);
  const [intervalModalVisible, setIntervalModalVisible] = useState(false);
  const setInterval = async (activate = alertActivate, inv = interval) => {
    dispatch(setAlertInterval({ activate, interval: inv }));
    await setAlert(activate, inv);
  };

  const {
    activate: interferActive,
    beginHour,
    beginMin,
    endHour,
    endMin,
  } = useSelector(getInterferenceTime);

  const [isStart, setIsStart] = useState(true);
  const [interfModalVisible, setInterfModalVisible] = useState(false);
  const setInterference = async (
    activate = interferActive,
    beHour = beginHour,
    beMin = beginMin,
    enHour = endHour,
    enMin = endMin
  ) => {
    dispatch(
      setInterferenceTime({
        activate,
        beginHour: beHour,
        beginMin: beMin,
        endHour: enHour,
        endMin: enMin,
      })
    );
    await setInterfernce(activate, beHour, beMin, enHour, enMin);
  };

  const logOut = () => {
    dispatch(setAuth({ isSignIn: false, tokenVal: null }));
    userSignOut();
  };

  return (
    <SettingView
      navigation={navigation}
      route={route}
      goBack={goBack}
      alertActivate={alertActivate}
      interval={interval}
      setAlertInterval={setInterval}
      intervalModalVisible={intervalModalVisible}
      setIntervalModalVisible={setIntervalModalVisible}
      interferenceTimeActivate={interferActive}
      beginHour={beginHour}
      beginMin={beginMin}
      endHour={endHour}
      endMin={endMin}
      setInterference={setInterference}
      isStart={isStart}
      setIsStart={setIsStart}
      interfModalVisible={interfModalVisible}
      setInterfModalVisible={setInterfModalVisible}
      logOut={logOut}
    />
  );
};
