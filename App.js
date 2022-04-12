import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "styled-components/native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import { darkTheme, lightTheme } from "./styles/Theme";
import SignOutNav from "./src/navigators/SignOutNav";
import SignInNav from "./src/navigators/SignInNav";

export default function App() {
  const [isSignIn, setSignIn] = useState(true);

  let colorScheme = useColorScheme();
  // let Theme = colorScheme === "light" ? lightTheme : darkTheme;
  let Theme = colorScheme === "light" ? lightTheme : lightTheme;

  return (
    <>
      {/* <ApolloProvider client={client}> */}
      <AppearanceProvider>
        <ThemeProvider theme={Theme}>
          <NavigationContainer>
            {isSignIn ? <SignInNav /> : <SignOutNav />}
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
      {/* </ApolloProvider> */}
    </>
  );
}
