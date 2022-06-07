import AsyncStorage from "@react-native-async-storage/async-storage";

const ALERT_INTERVAL = "AlertInterval";
const INTERFERNCE_TIME = "InterfernceTime";

export const setAlert = async (activate, interval) => {
  try {
    const jsonValue = JSON.stringify({
      activate: activate,
      interval: interval,
    });
    await AsyncStorage.setItem(ALERT_INTERVAL, jsonValue);
  } catch (e) {
    console.log("SET ERROR: ", e);
  }
};

export const setInterfernce = async (
  activate,
  beginHour,
  beginMin,
  endHour,
  endMin
) => {
  try {
    const jsonValue = JSON.stringify({
      activate,
      beginHour,
      beginMin,
      endHour,
      endMin,
    });
    await AsyncStorage.setItem(INTERFERNCE_TIME, jsonValue);
  } catch (e) {
    console.log("SET ERROR: ", e);
  }
};
