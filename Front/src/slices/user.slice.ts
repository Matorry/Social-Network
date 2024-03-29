import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/user';
import {
  deleteThunk,
  followThunk,
  getUserByIdThunk,
  getUserByUsernameThunk,
  loginThunk,
  registerThunk,
  unfollowThunk,
  updateThunk,
} from '../thunks/user.thunk';
import { Logged } from '../types/logged';

export type UsersState = {
  currentUser: Logged;
  isLoading: boolean;
  status: 'logged' | 'not logged' | 'error' | 'registered';
  error: string | undefined;
  search: User | undefined;
  userDetail: User | undefined;
};

const initialState: UsersState = {
  currentUser: { user: {}, token: '' } as Logged,
  isLoading: false,
  status: 'not logged',
  error: undefined,
  search: undefined,
  userDetail: undefined,
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
    setUserDetail: (state, { payload }: { payload: User }) => {
      state.userDetail = payload;
    },
    setUserSearch: (state) => {
      state.search = undefined;
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

    builder.addCase(
      updateThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.currentUser.user = payload;
        state.isLoading = false;
        state.error = undefined;
      }
    );

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

    builder.addCase(getUserByIdThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(
      getUserByIdThunk.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.userDetail = payload;
        state.error = undefined;
        state.isLoading = false;
      }
    );

    builder.addCase(getUserByIdThunk.rejected, (state, action) => {
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
        state.search = payload;
        state.error = undefined;
        state.isLoading = false;
      }
    );

    builder.addCase(getUserByUsernameThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(followThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(
      followThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.currentUser.user = payload;
        state.isLoading = false;
        state.error = undefined;
      }
    );

    builder.addCase(followThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });

    builder.addCase(unfollowThunk.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });

    builder.addCase(
      unfollowThunk.fulfilled,
      (state, { payload }: { payload: User }) => {
        state.currentUser.user = payload;
        state.isLoading = false;
        state.error = undefined;
      }
    );

    builder.addCase(unfollowThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.status = 'error';
      state.error = action.error.message;
    });
  },
});

export const actions = usersSlice.actions;
export default usersSlice.reducer;
