import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    category: null,
    currency: null,
  },
  reducers: {
    setCurrencyFilter(state, action) {
      state.currency = action.payload;
    },
    setCategoryFilter(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setCategoryFilter, setCurrencyFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
