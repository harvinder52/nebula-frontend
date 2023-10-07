import { createSlice } from "@reduxjs/toolkit";
import themeConfigs from "../assets/themes/themeConfig";

const themeSlice = createSlice({
  name: "theme",
  initialState: themeConfigs[0], // Set an initial theme config
  reducers: {
    setThemeConfig: (state, action) => {
      return action.payload;
    },
  },
});

export const { setThemeConfig } = themeSlice.actions;
export default themeSlice.reducer;
