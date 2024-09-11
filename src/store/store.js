import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./slices/carsSlice"; // Import the reducer from carsSlice
import dateRangeReducer from "./slices/dateRangeSlice"; // Import the reducer from dateRangeSlice

const store = configureStore({
  reducer: {
    carsData: carsReducer,
    dateRangeData: dateRangeReducer, // Corrected the reducer key
  },
  devTools: true,
});

export default store; // Export the store as default
