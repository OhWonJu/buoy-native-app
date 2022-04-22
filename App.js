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

import store from "./store/store";
import { setCoordinate, getCoordinate } from "./store/coordinateReducer";
import { darkTheme, lightTheme } from "./styles/Theme";
import SignOutNav from "./src/navigators/SignOutNav";
import SignInNav from "./src/navigators/SignInNav";
import { _GET } from "./commonRestAPIModel";

function App() {
  const [isSignIn, setSignIn] = useState(true);
  const [groupData, setGroupData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignIn) {
      (async () => {
        try {
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
          _GET("http://192.168.0.20:3124/main/group", setGroupData, setLoading);
        } catch (e) {
          setLoading(true);
          console.error(e);
        }
      })();
    }
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
