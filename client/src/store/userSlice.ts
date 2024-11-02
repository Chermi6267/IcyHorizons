import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string | null;
  role: "USER" | "ADMIN";
  loggedWith: "google" | "credentials" | null;
}

const initialState: IUser = {
  email: null,
  role: "USER",
  loggedWith: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.loggedWith = action.payload.loggedWith;
      state.role = action.payload.role;
    },

    unsetUser: (state) => {
      state.email = null;
      state.loggedWith = null;
      state.role = "USER";
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
