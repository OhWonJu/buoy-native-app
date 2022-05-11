import React, { useEffect, useState } from "react";

import AllocatedBuoyListView from "./AllocatedBuoyListView";

export default AllocatedBuoyController = ({
  navigation,
  route,
  headerHeight,
}) => {
  return (
    <AllocatedBuoyListView
      navigation={navigation}
      route={route}
      headerHeight={headerHeight}
    />
  );
};
