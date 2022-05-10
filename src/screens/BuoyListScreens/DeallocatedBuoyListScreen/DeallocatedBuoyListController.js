import React, { useEffect, useState } from "react";

import { _GET } from "../../../../utils/Api";
import DeallocatedBuoyListView from "./DeallocatedBuoyListView";

export default DeallocatedBuoyController = ({
  navigation,
  route,
  headerHeight,
  scrollY,
}) => {
  const [unBuoys, setUnBuoys] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    _GET(`/detail/buoy/unassigned`, setUnBuoys, setLoading);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <DeallocatedBuoyListView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
      deallocated={unBuoys}
      scrollY={scrollY}
    />
  );
};
