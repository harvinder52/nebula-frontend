import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

const submitFormDataSlice = createSlice({
  name: "submitFormData",
  initialState,
  reducers: {
    setSubmitFormData: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    clearSubmitFormData: (state) => {
      return {
        ...state,
        value: {},
      };
    },
  },
});

export const { setSubmitFormData, clearFormData } = formSlice.actions;
export default submitFormDataSlice.reducer;
