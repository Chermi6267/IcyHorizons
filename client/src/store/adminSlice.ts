import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminCenter } from "@/interfaces/landmark";

const initialState: IAdminCenter = {
  id: "1",
  name: "Республика Саха Якутия",
  area: "3083523",
  capital: "Якутск",
};

export const adminSlice = createSlice({
  name: "adminCenter",
  initialState,
  reducers: {
    setAdminCenter: (state, action: PayloadAction<IAdminCenter>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.area = action.payload.area;
      state.capital = action.payload.capital;
    },
  },
});

export const { setAdminCenter } = adminSlice.actions;

export default adminSlice.reducer;
