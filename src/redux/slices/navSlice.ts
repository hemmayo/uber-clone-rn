import { createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../store";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTimeTravelInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTimeTravelInformation } =
  navSlice.actions;

// Selectors
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.nav.travelTimeInformation;

const navReducer = navSlice.reducer;
export default navReducer;
