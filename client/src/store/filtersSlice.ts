import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilters {
  categories: string[];
  sortVariable: {
    type: "asc" | "desc";
    group: "comment" | "rating";
  };
}

const initialState: IFilters = {
  categories: ["1", "2", "3", "4"],
  sortVariable: {
    type: "desc",
    group: "rating",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },

    setSortVariableFilter: (
      state,
      action: PayloadAction<{
        type: "asc" | "desc";
        group: "comment" | "rating";
      }>
    ) => {
      state.sortVariable.group = action.payload.group;
      state.sortVariable.type = action.payload.type;
    },
  },
});

export const { setCategoryFilter, setSortVariableFilter } =
  filtersSlice.actions;

export default filtersSlice.reducer;
