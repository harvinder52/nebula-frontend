import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./src/features/formSlice";
import formInputDataReducer from "./src/features/formInputDataSlice";
export const store = configureStore({
  reducer: { formReducer: formReducer, inputFormData: formInputDataReducer },
});
