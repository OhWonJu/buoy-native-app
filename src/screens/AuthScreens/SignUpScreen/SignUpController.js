import React, { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import {
  _CONFIRM_EMAIL_CODE,
  _CREATE_ACCOUNT,
  _REQUEST_EMAIL_CODE,
} from "./SignUpModel";
import SignUpView from "./SignUpView";

const LIMIT_TIME = 179;
const EMAIL_REX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default SignUpController = ({ navigation, route }) => {
  const [condition, setCondition] = useState({
    emailVerify: false, // 이메일 양식 확인
    emailConfirm: false, // 이메일 인증 여부
    passwordVerify: false, // 비밀번호 양식
    passwordConfirm: false, // 비밀번호 확인 여부
  });

  const [time, setTime] = useState(LIMIT_TIME);

  // forms
  const { register, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      email: route.params?.email,
      // name: route.params?.lastName + route.params.firstName,
      // phoneNumber: route.params?.phoneNumber,
      // snsKey: route.params?.snsKey,
    },
  });
  // forms useEffect
  useEffect(() => {
    register("email", {
      required: true,
    });
    register("password", {
      required: true,
    });
    register("passwordCheck", {
      required: true,
    });
    register("name", {
      required: true,
    });
    // register("phoneNumber");
    // register("snsKey");
  }, [register]);

  // refs - form 이동을 위한 refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const nameRef = useRef();
  const onNext = (next) => {
    next?.current?.focus();
  };

  const [createLoading, setCreateLoading] = useState(false);
  const onRegist = async (data) => {
    let isDone = false;
    if (!createLoading) {
      isDone = await _CREATE_ACCOUNT(
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        setCreateLoading
      );
    }
    if (isDone) {
      const { email, password } = getValues();
      navigation.navigate("SignIn", { email, password });
    } else {
      alert("계정 생성에 실패했습니다.");
    }
  };

  // 인증 코드 발송
  const [codeView, setCodeView] = useState(false);
  const [requestCodeLoading, setRequestCodeLoading] = useState(false);
  const onCompletedRequestCode = ({ ok, error }) => {
    if (!requestCodeLoading) {
      if (ok) {
        setCodeView(true);
        alert("인증코드가 발송되었습니다.");
        return;
      } else if (error === "Email exist.") {
        alert("이미 사용중인 이메일입니다.");
      } else {
        alert("이메일 발송에 실패했습니다.");
      }
    }
  };
  const requestEmailCode = useCallback(async (email) => {
    onCompletedRequestCode(
      await _REQUEST_EMAIL_CODE({ email: email }, setRequestCodeLoading)
    );
  }, []);
  // 인증 코드 검증
  const [codeInput, setCodeInput] = useState("");
  const confirmEmailCode = async () => {
    const isConfirm = await _CONFIRM_EMAIL_CODE({
      email: getValues("email"),
      code: codeInput,
    });
    if (isConfirm) {
      alert("인증되었습니다.");
      setCodeView(false);
      setCondition((prevState) => {
        return { ...prevState, emailConfirm: true };
      });
    } else {
      alert("이메일 인증 코드가 맞지 않습니다.");
      setCondition((prevState) => {
        return { ...prevState, emailConfirm: false };
      });
    }
  };

  // 이메일 형식 검사
  const emailVerification = (text) => {
    if (text.length > 6 && EMAIL_REX.test(text)) {
      setCondition((prevState) => {
        return { ...prevState, emailVerify: true };
      });
    } else {
      setCondition((prevState) => {
        return { ...prevState, emailVerify: false };
      });
    }
  };

  // password 관련
  const passwordVerification = (text) => {
    if (text.length >= 4 && text.length < 17) {
      setCondition((prevState) => {
        return { ...prevState, passwordVerify: true };
      });
    } else {
      setCondition((prevState) => {
        return { ...prevState, passwordVerify: false };
      });
    }
  };
  const passwordComparison = () => {
    const { password, passwordCheck } = getValues();
    if (password === passwordCheck) {
      setCondition((prevState) => {
        return { ...prevState, passwordConfirm: true };
      });
    } else {
      setCondition((prevState) => {
        return { ...prevState, passwordConfirm: false };
      });
    }
  };

  const goBack = () => navigation.goBack();

  return (
    <SignUpView
      condition={condition}
      handleSubmit={handleSubmit}
      setValue={setValue}
      getValues={getValues}
      onRegist={onRegist}
      emailRef={emailRef}
      passwordRef={passwordRef}
      passwordCheckRef={passwordCheckRef}
      nameRef={nameRef}
      onNext={onNext}
      setCodeInput={setCodeInput}
      requestEmailCode={requestEmailCode}
      confirmEmailCode={confirmEmailCode}
      emailVerification={emailVerification}
      passwordVerification={passwordVerification}
      passwordComparison={passwordComparison}
      goBack={goBack}
      codeView={codeView}
    />
  );
};
