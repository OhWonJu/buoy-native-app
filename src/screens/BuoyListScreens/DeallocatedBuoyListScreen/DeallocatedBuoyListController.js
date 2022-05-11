import React, { useCallback, useEffect, useState } from "react";

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

  if (loading) {
    return null;
  }

  const goToBuoyDetail = (item) =>
    navigation.navigate("BuoyDetail", { data: item });

  return (
    <DeallocatedBuoyListView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
      deallocated={unBuoys}
      refreshing={refreshing}
      onRefresh={onRefresh}
      goToBuoyDetail={goToBuoyDetail}
    />
  );
};
