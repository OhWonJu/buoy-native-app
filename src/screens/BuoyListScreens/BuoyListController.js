import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { _GET } from "../../../utils/Api";
import { getDrawerIdx, setDrawerIdx } from "../../../store/drawerBtnReducer";
import BuoyListView from "./BuoyListView";

export default BuoyListController = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { index } = useSelector(getDrawerIdx);
  useEffect(() => {
    const backAction = () => {
      //                                      토글 버튼 len
      dispatch(setDrawerIdx({ index: (index + 1) % 2 }));
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const [headerHeight, setHeaderHeight] = useState(0);
  const goBack = () => {
    dispatch(setDrawerIdx({ index: (index + 1) % 2 }));
    navigation.goBack();
  };

  return (
    <BuoyListView
      headerHeight={headerHeight}
      setHeaderHeight={setHeaderHeight}
      goBack={goBack}
    />
  );
};
