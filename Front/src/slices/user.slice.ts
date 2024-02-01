import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/user.thunk";
import { Logged } from "../types/logged";

export type UsersState = {
  currentUser: Logged;
  isAuthenticated: boolean;
  userStatus: "logged" | "not logged" | "error" | "pending";
  error: Error | null;
};

const initialState: UsersState = {
  currentUser: { user: {}, token: "" } as Logged,
  isAuthenticated: false,
  userStatus: "not logged",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.userStatus = "pending";
      state.error = null;
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, { payload }: { payload: Logged }) => {
        state.currentUser = payload;
        state.userStatus = "logged";
        state.error = null;
      }
    );

    builder.addCase(loginThunk.rejected, (state) => {
      state.userStatus = "error";
      state.error = new Error("error when logging in");
    });
  },
});

export default usersSlice.reducer;
