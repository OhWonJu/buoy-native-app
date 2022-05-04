import { createSlice } from "@reduxjs/toolkit";

export const groupUpdateSlice = createSlice({
  name: "groupUpdate",
  initialState: {
    isUpdate: false,
  },
  reducers: {
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload.isUpdate;
    },
  },
});

export const { setIsUpdate } = groupUpdateSlice.actions;
export default groupUpdateSlice.reducer;
export const getGroupUpdate = (state) => {
  return { isUpdate: state.groupUpdate.isUpdate };
};
