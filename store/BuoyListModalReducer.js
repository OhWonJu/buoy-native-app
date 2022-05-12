import { createSlice } from "@reduxjs/toolkit";

export const buoyListModalSlice = createSlice({
  name: "buoyListModal",
  initialState: {
    modalVisible: false,
    modalData: null,
  },
  reducers: {
    setBuoyListModal: (state, action) => {
      state.modalVisible = action.payload.modalVisible;
      state.modalData = action.payload.modalData;
    },
  },
});

export const { setBuoyListModal } = buoyListModalSlice.actions;
export default buoyListModalSlice.reducer;
export const getBuoyListModal = (state) => {
  return {
    modalVisible: state.buoyListModal.modalVisible,
    modalData: state.buoyListModal.modalData,
  };
};
