import React, { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import * as Location from "expo-location";
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import store from "./store/store";
import { setCoordinate } from "./store/coordinateReducer";
import { darkTheme, lightTheme } from "./styles/Theme";
import SignOutNav from "./src/navigators/SignOutNav";
import SignInNav from "./src/navigators/SignInNav";
import { API, _GET, _REFECTH } from "./utils/Api";
import { getAuth, setAuth } from "./store/authReducer";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      // refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Notics
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
//

function App() {
  const { isSignIn, tokenVal } = useSelector(getAuth);
  const [groupData, setGroupData] = useState(null);
  const { data } = useQuery(
    ["groupData"],
    async () => {
      const res = await API.get("main/group");
      return res.data;
    },
    {
      enabled: !!isSignIn,
      cacheTime: "Infinity",
      onSettled: (data) => {
        setGroupData(data);
      },
    }
  );
  const [isLoading, setLoading] = useState(true);

  // console.log(isSignIn, tokenVal);

  const dispatch = useDispatch();

  const onFinish = () =>
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      API.defaults.headers.common["Authorization"] = "Bearer " + token;
      // 토큰 값을 redux에도 저장해서. 매번 AsyncStorage에서 get하지 않도록.
      dispatch(setAuth({ isSignIn: true, tokenVal: token }));

      setGroupData(queryClient.getQueryData("groupData"));
      // if (!data) {
      //   dispatch(setAuth({ isSignIn: false, tokenVal: null }));
      //   userSignOut();
      // } else {
      //   setGroupData(data);
      // }

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

  const colorScheme = Appearance.getColorScheme();
  // let Theme = colorScheme === "light" ? lightTheme : darkTheme;
  let Theme = colorScheme === "light" ? lightTheme : lightTheme;

  if (isLoading) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={Theme}>
        <NavigationContainer>
          {isSignIn ? <SignInNav groupData={groupData} /> : <SignOutNav />}
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </QueryClientProvider>
  );
}
