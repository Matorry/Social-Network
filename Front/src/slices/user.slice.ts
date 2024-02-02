import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import {
  deleteThunk,
  getUserByUsernameThunk,
  loginThunk,
  registerThunk,
  updateThunk,
} from '../thunks/user.thunk';
import { Logged } from '../types/logged';

export type UsersState = {
  currentUser: Logged;
  isLoading: boolean;
  status: 'logged' | 'not logged' | 'error' | 'registered';
  error: string | undefined;
  userSearch: User | undefined;
};

const initialState: UsersState = {
  currentUser: { user: {}, token: '' } as Logged,
  isLoading: false,
  status: 'not logged',
  error: undefined,
  userSearch: undefined,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.currentUser = { user: {}, token: '' } as Logged;
      state.isLoading = false;
      state.status = 'not logged';
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, { payload }: { payload: Logged }) => {
        state.currentUser = payload;
        state.isLoading = false;
        state.status = 'logged';
        state.error = undefined;
      }
    );

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(registerThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.status = 'registered';
      state.error = undefined;
    });

    builder.addCase(registerThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(updateThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(updateThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.error = undefined;
    });

    builder.addCase(updateThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(deleteThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(deleteThunk.fulfilled, () => {});

    builder.addCase(deleteThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(getUserByUsernameThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(
      getUserByUsernameThunk.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.userSearch = payload;
        state.error = undefined;
        state.isLoading = false;
      }
    );

    builder.addCase(getUserByUsernameThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export const actions = usersSlice.actions;
export default usersSlice.reducer;
