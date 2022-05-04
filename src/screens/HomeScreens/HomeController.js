import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import { getCoordinate } from "../../../store/coordinateReducer";
import { _GET, _REFECTH } from "../../../utils/Api";
import { _GET_HOME } from "./HomeModel";
// import { _GET, _REFECTH } from "../../../commonRestAPIModel";

import HomeView from "./HomeView";

export default HomeController = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [groups, setGroups] = useState(null);

  const [rTwidth, rTsetWidth] = useState(0);
  const [rBwidth, rBsetWidth] = useState(0);
  const [circleLen, setCircleLen] = useState(0);

  const { latitude, longitude } = useSelector(getCoordinate);

  useEffect(() => {
    _GET_HOME(
      [
        `main/data?latitude=${latitude}&longitude=${longitude}`,
        "main/group/total",
      ],
      [setData, setGroups],
      setLoading
    );
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    _REFECTH(`main/data?latitude=${latitude}&longitude=${longitude}`, setData);
    setRefreshing(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <HomeView
      meteoVal={data.meteo_val}
      obsData={data.obs_data}
      tidal={data.tidal}
      groupTotal={groups[0]}
      refreshing={refreshing}
      onRefresh={onRefresh}
      waveHight={data.wave_hight}
      rTwidth={rTwidth}
      rTsetWidth={rTsetWidth}
      rBwidth={rBwidth}
      rBsetWidth={rBsetWidth}
      circleLen={circleLen}
      setCircleLen={setCircleLen}
    />
  );
};
