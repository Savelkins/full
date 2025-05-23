import { configureStore } from "@reduxjs/toolkit";
import athletesReducer from "./athletesSlice";
import sportsReducer from "./sportsSlice";

const store = configureStore({
  reducer: {
    sports: sportsReducer,
    athletes: athletesReducer,
  },
});

export default store;
