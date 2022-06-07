import { createSlice } from "@reduxjs/toolkit";

export const alertIntervalSlice = createSlice({
  name: "alertInterval",
  initialState: {
    activate: 1,
    interval: 1,
  },
  reducers: {
    setAlertInterval: (state, action) => {
      state.activate = action.payload.activate;
      state.interval = action.payload.interval;
    },
  },
});

export const { setAlertInterval } = alertIntervalSlice.actions;
export default alertIntervalSlice.reducer;
export const getAlertInterval = (state) => {
  return {
    activate: state.alertInterval.activate,
    interval: state.alertInterval.interval,
  };
};
