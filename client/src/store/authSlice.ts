import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuth {
  isLoggedIn: boolean;
  accessToken?: string;
}

const initialState: IAuth = {
  isLoggedIn: false,
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload;
    },

    logOut: (state) => {
      state.isLoggedIn = false;
      state.accessToken = undefined;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
