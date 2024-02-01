import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/user.thunk";
import { Logged } from "../types/logged";

export type UsersState = {
  currentUser: Logged;
  isAuthenticated: boolean;
  userStatus: "logged" | "not logged" | "error" | "pending";
  error: string | undefined;
};

const initialState: UsersState = {
  currentUser: { user: {}, token: "" } as Logged,
  isAuthenticated: false,
  userStatus: "not logged",
  error: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.userStatus = "pending";
      state.error = undefined;
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, { payload }: { payload: Logged }) => {
        state.currentUser = payload;
        state.userStatus = "logged";
        state.error = undefined;
      }
    );

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.userStatus = "error";
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
