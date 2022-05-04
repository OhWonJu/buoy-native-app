import React, { useEffect } from "react";
import { View, Text, BackHandler } from "react-native";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import Container from "../../components/Container";
import { getDrawerIdx, setDrawerIdx } from "../../../store/drawerBtnReducer";

export default BouyListView = () => {
  const dispatch = useDispatch();

  const { index } = useSelector(getDrawerIdx);
  useEffect(() => {
    const backAction = () => {
      //                                           토글 버튼 len
      dispatch(setDrawerIdx({ index: (index + 1) % 2 }));
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Header title="부이목록" />
      <Container>
        <View>
          <Text>부이목록</Text>
        </View>
      </Container>
    </>
  );
};
