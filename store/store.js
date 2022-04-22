import { configureStore } from "@reduxjs/toolkit";
import coordinateReducer from "./coordinateReducer";

export default store = configureStore({
  reducer: {
    coordinate: coordinateReducer,
    // groupIds
  },
});
