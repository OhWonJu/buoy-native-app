import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

// 비동기라..
export const userSignIn = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN, token);
  } catch (e) {
    console.log("SET ERROR: ", e);
  }
};

export const userSignOut = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN);
  } catch (e) {
    console.log("SignOutERROR: ", e);
  }
};
