import React, { useEffect, useState } from "react";

export default function App() {
  const [isSignIn, setSignIn] = useState(false);

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
