import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components/native";
import { useForm } from "react-hook-form";

import { _LOGIN } from "./SignInModel";
import SignInView from "./SignInView";
import { userSignIn } from "../../../../auth";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../../store/authReducer";

export default SignInController = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    defaultValues: {
      email: route.params?.email,
      password: route.params?.password,
    },
  });
  useEffect(() => {
    register("email");
    register("password");
  }, [register]);
  useEffect(() => {
    setValue("email", route.params?.email);
    setValue("password", route.params?.password);
  }, []);

  const [passwordUnvisible, setPasswordUnvisible] = useState(true);
  const [signButtonOPC, setSignButtonOPC] = useState({
    email: false,
    password: false,
  });
  const [turnOff, setTurnOff] = useState(true);

  const passwordRef = useRef();

  useEffect(() => {
    setValue("email", route.params?.email);
    setValue("password", route.params?.password);
  }, []);

  const [loading, setLoading] = useState(false);
  // react hook form
  const onValid = async (data) => {
    let result = null;
    if (!loading) {
      result = await _LOGIN(data, setLoading);
    }
    if (result.code === 1) {
      await userSignIn(result.token);
      dispatch(setAuth({ isSignIn: true, tokenVal: result.token }));
    } else {
      console.log(result);
    }
  };

  // Ref
  const onEmailNext = () => {
    passwordRef?.current?.focus();
  };

  // 로그인 버튼 활성화 관련
  const emailCompleted = (text) => {
    if (text.length > 6) {
      setSignButtonOPC((prevState) => {
        return { ...prevState, email: true };
      });
    } else {
      setSignButtonOPC((prevState) => {
        return { ...prevState, email: false };
      });
    }
  };
  const passwordCompleted = (text) => {
    // 테스트를 위해 len 조절... 원래는 7자 이상
    if (text.length > 3 && text.length < 17) {
      setSignButtonOPC((prevState) => {
        return {
          ...prevState,
          password: true,
        };
      });
    } else {
      setSignButtonOPC((prevState) => {
        return {
          ...prevState,
          password: false,
        };
      });
    }
  };
  useEffect(() => {
    if (
      (signButtonOPC.email === true && signButtonOPC.password === true) ||
      route.params
    ) {
      setTurnOff(false);
    } else {
      setTurnOff(true);
    }
  }, [signButtonOPC]);

  // password 입력 보안 보기 관련
  const handlePasswordVisible = () => {
    setPasswordUnvisible(!passwordUnvisible);
  };

  // navigate
  const goBack = () => navigation.goBack();
  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SignInView
      goBack={goBack}
      goToSignUp={goToSignUp}
      setValue={setValue}
      watch={watch}
      emailCompleted={emailCompleted}
      passwordCompleted={passwordCompleted}
      passwordUnvisible={passwordUnvisible}
      onEmailNext={onEmailNext}
      passwordRef={passwordRef}
      handlePasswordVisible={handlePasswordVisible}
      handleSubmit={handleSubmit}
      onValid={onValid}
      turnOff={turnOff}
    />
  );
};
