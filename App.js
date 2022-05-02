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
import { API, _GET } from "./utils/Api";
import { getAuth, setAuth } from "./store/authReducer";

function App() {
  const [groupData, setGroupData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const { isSignIn, tokenVal } = useSelector(getAuth);

  const dispatch = useDispatch();

  const onFinish = () =>
    setTimeout(() => {
      setLoading(false);
    }, 3000);

  const preload = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token != "") {
        API.defaults.headers.common["Authorization"] = "Bearer " + token;
        // 토큰 값을 redux에도 저장해서. 매번 AsyncStorage에서 get하지 않도록.
        dispatch(setAuth({ isSignIn: true, tokenVal: token }));

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
        _GET("main/group", setGroupData, setLoading);
      }
    } catch (e) {
      console.log("getTOKEN ERROR: ", e);
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
  }, []);

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
