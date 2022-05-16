import { createSlice } from "@reduxjs/toolkit";

export const groupListDataSlice = createSlice({
  name: "groupListData",
  initialState: {
    groupData: null,
  },
  reducers: {
    setGroupListData: (state, action) => {
      state.groupData = action.payload.groupData;
    },
  },
});

export const { setGroupListData } = groupListDataSlice.actions;
export default groupListDataSlice.reducer;
export const getGroupListData = (state) => {
  return { groupData: state.groupListData.groupData };
};
