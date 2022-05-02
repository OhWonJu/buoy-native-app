import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import coordinateReducer from "./coordinateReducer";

export default store = configureStore({
  reducer: {
    auth: authReducer,
    coordinate: coordinateReducer,
    // groupIds
  },
});
