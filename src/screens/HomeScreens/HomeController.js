import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { getCoordinate } from "../../../store/coordinateReducer";
import { API, _GET, _REFECTH } from "../../../utils/Api";
import { _GET_HOME } from "./HomeModel";
// import { _GET, _REFECTH } from "../../../commonRestAPIModel";

import HomeView from "./HomeView";
import { useQuery, useQueryClient } from "react-query";

export default HomeController = ({ navigation, route }) => {
  const { latitude, longitude } = useSelector(getCoordinate);

  const { data: groupTotal } = useQuery(
    ["mainData", "groupTotal"],
    async () => {
      const res = await API.get("main/group/total");
      return res.data;
    },
    {}
  );
  const { data: weatherData, isLoading } = useQuery(
    ["mainData", "weatherData", latitude, longitude],
    async () => {
      const res = await API.get(
        `main/data?latitude=${latitude}&longitude=${longitude}`
      );
      return res.data;
    },
    {
      // 10분이 지나면 오래된 캐시로 간주
      staleTime: 10 * 60 * 1000,
      // staleTime이 지났고, focuse됐을때
      refetchOnWindowFocus: true,
    }
  );

  const [rTwidth, rTsetWidth] = useState(0);
  const [rBwidth, rBsetWidth] = useState(0);
  const [circleLen, setCircleLen] = useState(0);

  const queryClinet = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClinet.refetchQueries(["mainData"]);
    setRefreshing(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <HomeView
      meteoVal={weatherData.meteo_val}
      obsData={weatherData.obs_data}
      tidal={weatherData.tidal}
      groupTotal={groupTotal[0]}
      refreshing={refreshing}
      onRefresh={onRefresh}
      waveHight={weatherData.wave_hight}
      rTwidth={rTwidth}
      rTsetWidth={rTsetWidth}
      rBwidth={rBwidth}
      rBsetWidth={rBsetWidth}
      circleLen={circleLen}
      setCircleLen={setCircleLen}
    />
  );
};
