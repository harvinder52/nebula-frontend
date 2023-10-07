import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./src/features/formSlice";
import formInputDataReducer from "./src/features/formInputDataSlice";
import themeReducer from "./src/features/themeSlice";
export const store = configureStore({
  reducer: {
    formReducer: formReducer,
    theme: themeReducer,
    inputFormData: formInputDataReducer,
  },
});
