import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import _ from "underscore";

import { _GET, _REFECTH } from "../../../../utils/Api";
import DeallocatedBuoyListView from "./DeallocatedBuoyListView";

export default DeallocatedBuoyController = ({
  navigation,
  route,
  headerHeight,
}) => {
  const [seletedItem, setSeletedItem] = useState([]);

  const [unBuoys, setUnBuoys] = useState(null);
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      _GET(`/detail/buoy/unassigned`, setUnBuoys, setLoading);
      setSeletedItem([]);
    }, [])
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _REFECTH(`/detail/buoy/unassigned`, setUnBuoys);
    setRefreshing(false);
  }, []);

  const [multiSelect, setMultiSelect] = useState(false);
  const [allSelect, setAllSelect] = useState(false);
  useEffect(() => {
    if (allSelect && multiSelect) {
      _.forEach(unBuoys, (data) => (data.selected = true));
      const list = _.map(unBuoys, (data) => data.model);
      setSeletedItem(list);
      setUnBuoys(unBuoys);
    } else {
      _.forEach(unBuoys, (data) => (data.selected = false));
      setSeletedItem([]);
      return;
    }
  }, [allSelect, multiSelect]);

  const toggleSelect = (item) => {
    const target = _.find(unBuoys, item);
    if (target) {
      target.selected = target.selected == null ? true : !target.selected;
      if (target.selected) {
        setSeletedItem((prevState) => {
          return [...prevState, target.model];
        });
      } else {
        const newData = [...seletedItem];
        const index = seletedItem.findIndex((data) => data === item.model);
        newData.splice(index, 1);
        setSeletedItem(newData);
      }
    }
    setUnBuoys(unBuoys);
  };

  const onPressHandler = useCallback((item) => {
    if (multiSelect) {
      toggleSelect(item);
    } else {
      goToBuoyDetail(item);
    }
  });
  const goToBuoyDetail = (item) =>
    navigation.navigate("BuoyDetail", { model: item.model });
  const goToGroupList = (list) =>
    navigation.navigate("GroupList", { buoyList: list, isAppend: true });

  if (loading) {
    return null;
  }

  return (
    <DeallocatedBuoyListView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
      deallocated={unBuoys}
      refreshing={refreshing}
      onRefresh={onRefresh}
      multiSelect={multiSelect}
      setMultiSelect={setMultiSelect}
      allSelect={allSelect}
      setAllSelect={setAllSelect}
      seletedItem={seletedItem}
      onPressHandler={onPressHandler}
      goToGroupList={goToGroupList}
    />
  );
};
