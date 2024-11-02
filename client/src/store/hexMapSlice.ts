import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IHexMap {
  selectedRegion: string;
}

const initialState: IHexMap = {
  selectedRegion: "ALL",
};

export const hexMapSlice = createSlice({
  name: "hexMap",
  initialState,
  reducers: {
    setRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
    },
  },
});

export const { setRegion } = hexMapSlice.actions;

export default hexMapSlice.reducer;
