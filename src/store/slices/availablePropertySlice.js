import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  propertyDetails: {},
  propertyStatus: "", // Added propertyStatus here
};

const availablePropertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setProperty: (state, action) => {
      state.propertyDetails = action.payload;
    },

    setPropertyStatus: (state, action) => {
      state.propertyStatus = action.payload; // Updating propertyStatus
    },

    toggleBookmarkState: (state) => {
      if (state.propertyDetails) {
        state.propertyDetails.isBookmarked =
          !state.propertyDetails.isBookmarked;
      }
    },
  },
});

export const { setProperty, toggleBookmarkState, setPropertyStatus } =
  availablePropertySlice.actions;
export default availablePropertySlice.reducer;
