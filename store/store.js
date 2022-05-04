import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import coordinateReducer from "./coordinateReducer";
import groupUpdateReducer from "./groupUpdateReducer";

export default store = configureStore({
  reducer: {
    auth: authReducer,
    coordinate: coordinateReducer,
    groupUpdate: groupUpdateReducer,
    // groupIds
  },
});
