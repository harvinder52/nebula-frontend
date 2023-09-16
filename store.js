import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./src/features/formSlice";
export const store = configureStore({
  reducer: { formReducer },
});
