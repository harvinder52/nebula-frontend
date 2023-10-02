// inputSlice.js

import { createSlice } from "@reduxjs/toolkit";

const formInputDataSlice = createSlice({
  name: "input",
  initialState: {},
  reducers: {
    setInputFormDataValue: (state, action) => {
      const { entryId, value } = action.payload;
      state[entryId] = value;
    },
    clearInputFormDataValue: (state, action) => {
      const { entryId } = action.payload;
      delete state[entryId];
    },
  },
});

export const { setInputFormDataValue, clearInputFormDataValue } =
  formInputDataSlice.actions;
export default formInputDataSlice.reducer;
