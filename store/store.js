import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import buoyListModalReducer from "./buoyListModalReducer";
import coordinateReducer from "./coordinateReducer";
import drawerIdxReducer from "./drawerBtnReducer";

export default store = configureStore({
  reducer: {
    auth: authReducer,
    coordinate: coordinateReducer,
    drawerIdx: drawerIdxReducer,
    buoyListModal: buoyListModalReducer,
  },
});
