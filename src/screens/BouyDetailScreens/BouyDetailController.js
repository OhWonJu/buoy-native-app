import React, { useEffect, useState } from "react";
import { _GET } from "../../../utils/Api";

import BouyDetailView from "./BouyDetailView";

export default BouyDetailController = ({ route }) => {
  const [buoyData, setBuoyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (route.params?.model) {
      const result = _GET(
        `detail/buoy?model=${route.params.model}`,
        setBuoyData,
        setLoading
      );
    }
  }, []);

  if (loading) {
    return null;
  }
  return <BouyDetailView {...buoyData[0]} />;
};
