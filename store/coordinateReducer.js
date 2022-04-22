import { createSlice } from "@reduxjs/toolkit";

export const coordinateSlice = createSlice({
  name: "coordinate",
  initialState: {
    latitude: 35.95,
    longitude: 128.25,
  },
  reducers: {
    setCoordinate: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setCoordinate } = coordinateSlice.actions;
export default coordinateSlice.reducer;
export const getCoordinate = (state) => {
  return {
    latitude: state.coordinate.latitude,
    longitude: state.coordinate.longitude,
  };
};
