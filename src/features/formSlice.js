import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    clearFormData: (state) => {
      return {
        ...state,
        value: {},
      };
    },
  },
});

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
