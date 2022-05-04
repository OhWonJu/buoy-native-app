import { createSlice } from "@reduxjs/toolkit";

export const drawerIdxSlice = createSlice({
  name: "drawerIdx",
  initialState: {
    index: 0,
  },
  reducers: {
    setDrawerIdx: (state, action) => {
      state.index = action.payload.index;
    },
  },
});

export const { setDrawerIdx } = drawerIdxSlice.actions;
export default drawerIdxSlice.reducer;
export const getDrawerIdx = (state) => {
  return { index: state.drawerIdx.index };
};
