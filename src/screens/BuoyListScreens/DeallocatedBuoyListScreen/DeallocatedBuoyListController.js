import React, { useCallback, useEffect, useState } from "react";
import _ from "underscore";

import { _GET, _REFECTH } from "../../../../utils/Api";
import DeallocatedBuoyListView from "./DeallocatedBuoyListView";

export default DeallocatedBuoyController = ({
  navigation,
  route,
  headerHeight,
}) => {
  const [unBuoys, setUnBuoys] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    _GET(`/detail/buoy/unassigned`, setUnBuoys, setLoading);
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _REFECTH(`/detail/buoy/unassigned`, setUnBuoys);
    setRefreshing(false);
  }, []);

  const [multiSelect, setMultiSelect] = useState(false);
  const [seletedItem, setSeletedItem] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  useEffect(() => {
    if (allSelect && multiSelect) {
      _.forEach(unBuoys, (data) => (data.selected = true));
      setSeletedItem(unBuoys);
      setUnBuoys(unBuoys);
    } else {
      _.forEach(unBuoys, (data) => (data.selected = false));
      setSeletedItem([]);
      return;
    }
  }, [allSelect, multiSelect]);

  const goToBuoyDetail = (item) =>
    navigation.navigate("BuoyDetail", { data: item });

  const toggleSelect = (item) => {
    const target = _.find(unBuoys, item);
    if (target) {
      target.selected = target.selected == null ? true : !target.selected;
      if (target.selected) {
        setSeletedItem((prevState) => {
          return [...prevState, target];
        });
      } else {
        const newData = [...seletedItem];
        const index = _.findIndex(seletedItem, item);
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
      onPressHandler={onPressHandler}
    />
  );
};
