import React, { useState } from "react";

import HomeView from "./HomeView";

export default HomeController = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  // const goBack = () => navigation.goBack();
  // const goToRecipeDetail = () => navigation.navigate("RecipeDetail");
  // const goToNotification = () => navigation.navigate("Notification");
  return (
    <HomeView headerHeight={headerHeight} setHeaderHeight={setHeaderHeight} />
  );
};
