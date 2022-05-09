import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import * as Location from "expo-location";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import store from "./store/store";
import { setCoordinate } from "./store/coordinateReducer";
import { darkTheme, lightTheme } from "./styles/Theme";
import SignOutNav from "./src/navigators/SignOutNav";
import SignInNav from "./src/navigators/SignInNav";
import { API, _GET, _REFECTH } from "./utils/Api";
import { getAuth, setAuth } from "./store/authReducer";
import { getGroupUpdate, setIsUpdate } from "./store/groupUpdateReducer";
import { userSignOut } from "./auth";

function App() {
  const [groupData, setGroupData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { isSignIn, tokenVal } = useSelector(getAuth);

  // console.log(isSignIn, tokenVal);

  const dispatch = useDispatch();

  const onFinish = () =>
    setTimeout(() => {
      setLoading(false);
    }, 2000);

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      API.defaults.headers.common["Authorization"] = "Bearer " + token;
      // 토큰 값을 redux에도 저장해서. 매번 AsyncStorage에서 get하지 않도록.
      dispatch(setAuth({ isSignIn: true, tokenVal: token }));
      const result = await _GET("main/group", setGroupData, setLoading);
      if (!result.ok) {
        dispatch(setAuth({ isSignIn: false, tokenVal: null }));
        userSignOut();
      }

      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      if (latitude) {
        dispatch(setCoordinate({ latitude, longitude }));
      }
    }
    // return preloadAssets();
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        preload();
      } catch (e) {
        console.warn(e);
      } finally {
        onFinish();
      }
    };
    prepare();
  }, [isSignIn]);

  // 그룹데이터 업데이트 시 다시 데이터 로드하기 위해...
  const { isUpdate } = useSelector(getGroupUpdate);
  useEffect(() => {
    if (isUpdate) {
      _REFECTH("main/group", setGroupData);
      dispatch(setIsUpdate({ isUpdate: false }));
    }
  }, [isUpdate]);

  let colorScheme = useColorScheme();
  // let Theme = colorScheme === "light" ? lightTheme : darkTheme;
  let Theme = colorScheme === "light" ? lightTheme : lightTheme;

  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* <ApolloProvider client={client}> */}
      <AppearanceProvider>
        <ThemeProvider theme={Theme}>
          <NavigationContainer>
            {isSignIn ? <SignInNav groupData={groupData} /> : <SignOutNav />}
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
      {/* </ApolloProvider> */}
    </>
  );
}

export default function AppWrapper() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
}
