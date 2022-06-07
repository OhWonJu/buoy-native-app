import { configureStore } from "@reduxjs/toolkit";
import alertIntervalReducer from "./alertIntervalReducer";
import authReducer from "./authReducer";
import buoyListModalReducer from "./buoyListModalReducer";
import coordinateReducer from "./coordinateReducer";
import drawerIdxReducer from "./drawerBtnReducer";
import interferenceTimeReducer from "./interferenceTimeReducer";

export default store = configureStore({
  reducer: {
    auth: authReducer,
    coordinate: coordinateReducer,
    drawerIdx: drawerIdxReducer,
    buoyListModal: buoyListModalReducer,
    alertInterval: alertIntervalReducer,
    interferenceTime: interferenceTimeReducer,
  },
});
