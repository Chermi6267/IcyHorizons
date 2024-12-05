import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string | null;
  role: "USER" | "ADMIN";
  loggedWith: "google" | "credentials" | null;
  avatar: string | null;
  name: string | null;
  header: string | null;
}

const initialState: IUser = {
  email: null,
  role: "USER",
  loggedWith: null,
  avatar: null,
  name: null,
  header: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.loggedWith = action.payload.loggedWith;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.header = action.payload.header || "";
    },

    unsetUser: (state) => {
      state.email = null;
      state.loggedWith = null;
      state.role = "USER";
      state.avatar = null;
      state.name = null;
      state.header = null;
    },

    setNewName: (state, action: PayloadAction<Pick<IUser, "name">>) => {
      state.name = action.payload.name;
    },

    setNewAvatar: (state, action: PayloadAction<Pick<IUser, "avatar">>) => {
      state.name = action.payload.avatar;
    },

    setNewHeader: (state, action: PayloadAction<Pick<IUser, "header">>) => {
      state.name = action.payload.header;
    },
  },
});

export const { setUser, unsetUser, setNewName, setNewAvatar, setNewHeader } =
  userSlice.actions;

export default userSlice.reducer;
