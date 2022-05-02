import React from "react";

import AuthHomeView from "./AuthHomeView";

export default AuthHomeController = ({ navigation }) => {
  const goToSignIn = () => navigation.navigate("SignIn");
  const goToSignUp = () => navigation.navigate("SignUp");

  return <AuthHomeView goToSignIn={goToSignIn} goToSignUp={goToSignUp} />;
};
