import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import BuoyListModalReducer from "./BuoyListModalReducer";
import coordinateReducer from "./coordinateReducer";
import drawerIdxReducer from "./drawerBtnReducer";
import groupUpdateReducer from "./groupUpdateReducer";

export default store = configureStore({
  reducer: {
    auth: authReducer,
    coordinate: coordinateReducer,
    groupUpdate: groupUpdateReducer,
    drawerIdx: drawerIdxReducer,
    buoyListModal: BuoyListModalReducer,
    // groupIds
  },
});
