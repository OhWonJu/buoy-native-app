import { createSlice } from "@reduxjs/toolkit";

export const interferenceTimeSlice = createSlice({
  name: "interferenceTime",
  initialState: {
    activate: 0,
    beginHour: 0,
    beginMin: 0,
    endHour: 0,
    endMin: 0,
  },
  reducers: {
    setInterferenceTime: (state, action) => {
      state.activate = action.payload.activate;
      state.beginHour = action.payload.beginHour;
      state.beginMin = action.payload.beginMin;
      state.endHour = action.payload.endHour;
      state.endMin = action.payload.endMin;
    },
  },
});

export const { setInterferenceTime } = interferenceTimeSlice.actions;
export default interferenceTimeSlice.reducer;
export const getInterferenceTime = (state) => {
  return {
    activate: state.interferenceTime.activate,
    beginHour: state.interferenceTime.beginHour,
    beginMin: state.interferenceTime.beginMin,
    endHour: state.interferenceTime.endHour,
    endMin: state.interferenceTime.endMin,
  };
};
