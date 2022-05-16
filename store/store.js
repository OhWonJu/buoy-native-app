import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import buoyListModalReducer from "./buoyListModalReducer";
import coordinateReducer from "./coordinateReducer";
import drawerIdxReducer from "./drawerBtnReducer";
import groupListDataReducer from "./groupListDataReducer";
import groupUpdateReducer from "./groupUpdateReducer";

export default store = configureStore({
  reducer: {
    auth: authReducer,
    coordinate: coordinateReducer,
    groupListData: groupListDataReducer,
    groupUpdate: groupUpdateReducer,
    drawerIdx: drawerIdxReducer,
    buoyListModal: buoyListModalReducer,
    // groupIds
  },
});
